import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

function castCard(cardId) {
  let color;
  switch (Math.floor((cardId - 1) / 27)) {
    case 0:
      color = "red";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "green";
      break;
  }

  const typeNumber = (cardId - 1) % 27;
  let type;
  if (typeNumber == 25) {
    type = "wild";
  } else if (typeNumber == 26) {
    type = "wild & draw 4";
  } else {
    const num = Math.ceil(typeNumber / 2);
    switch (num) {
      case 10:
        type = "skip";
        break;
      case 11:
        type = "reverse";
        break;
      case 12:
        type = "draw 2";
        break;
      default:
        type = String(num);
    }
  }

  return { id: cardId, color: color, type: type };
}

async function getAndCastGameStatus(gameId, userId) {
  const status = await GamesDB.getGameStatus(gameId);

  let last_card_played = castCard(status.last_card_played);
  const user_ids = await GamesDB.getUsersInGame(gameId);

  // get user for this turn
  let user_index = 0;
  if (status.last_user == null) {
    user_index = Math.floor(Math.random() * status.max_players);
  } else {
    let step = last_card_played.type == "skip" ? 2 : 1;
    user_index = user_ids.indexOf(status.last_user);
    if (status.is_clockwise) {
      user_index += step;
      if (user_index >= user_ids.length) {
        user_index -= user_ids.length;
      }
    } else {
      user_index -= step;
      if (user_index < 0) {
        user_index += user_ids.length;
      }
    }
  }

  // get cards for current user and check playable cards
  const current_user_cards = (await GamesDB.getUserCards(gameId, userId)).map(
    (card) => castCard(card)
  );

  let playable_cards_index = null;
  const user_this_turn = user_ids[user_index];
  if (userId == user_this_turn) {
    playable_cards_index = [];

    if (
      current_user_cards.length == 1 &&
      current_user_cards[0].type == "wild & draw 4"
    ) {
      // not allowing wild & draw 4 as the last card
    } else {
      let card_list = status.user_has_drew_once
        ? [current_user_cards[current_user_cards.length - 1]]
        : current_user_cards;

      for (let i = 0; i < card_list.length; i++) {
        const card = card_list[i];

        if (card.type == "wild & draw 4") {
          playable_cards_index.push(i);
        }
        // has NO penalty, regular case
        else if (status.penalty == 0) {
          if (card.type == "wild") {
            playable_cards_index.push(i);
          } else if (
            card.color == last_card_played.color ||
            card.type == last_card_played.type
          ) {
            playable_cards_index.push(i);
          }
        }
        // has penalty, last card must be a draw card
        // note that wild & draw 4 is already included
        else {
          if (last_card_played.type == "draw 2") {
            if (card.type == "draw 2") {
              playable_cards_index.push(i);
            }
          } else if (last_card_played.type == "wild & draw 4") {
            if (card.type == "draw 2" && card.color == last_card_played.color) {
              playable_cards_index.push(i);
            }
          } else {
            console.log(
              "ERROR: non-zero penalty with non-draw card as last card"
            );
          }
        }
      }

      if (status.user_has_drew_once && playable_cards_index.length > 0) {
        playable_cards_index = [current_user_cards.length - 1];
      }
    }
  }

  return {
    max_players: status.max_players,
    is_clockwise: status.is_clockwise,
    penalty: status.penalty,
    last_user: status.last_user,
    last_card_played: last_card_played,
    user_has_drew_once: status.user_has_drew_once,
    user_this_turn: user_this_turn,
    playable_cards_index: playable_cards_index,
    current_user_cards: current_user_cards,
  };
}

const getGameCurrentStatus = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  return res
    .status(HttpCode.OK)
    .json(await getAndCastGameStatus(gameId, userId));
};

// please ignore the red error for status.*
const playGame = async (req, res) => {
  const { card_id: cardIdStr, wild_color: colorStr } = req.body;
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  try {
    // validate the user for current turn
    const status = await getAndCastGameStatus(gameId, userId);
    if (status.playable_cards_index == null) {
      return res.status(HttpCode.BadRequest).json({
        error: "it is not the turn for userId=" + userId,
      });
    }

    const cardId = parseInt(cardIdStr);

    // draw card(s)
    if (Number.isNaN(cardId)) {
      if (status.user_has_drew_once) {
        await GamesDB.resetUserHasDrewOnce(gameId, userId);
        return res.status(HttpCode.OK).json({
          message:
            "user has drew once && cardId is NaN (not a number) => skip turn",
        });
      }

      if (status.penalty > 0) {
        await GamesDB.drawCards(gameId, userId, status.penalty);
        await GamesDB.resetPenalty(gameId);
        return res.status(HttpCode.OK).json({
          message: "Taking the penalty cards, now is still user's turn",
        });
      } else {
        await GamesDB.drawCards(gameId, userId, 1);
        await GamesDB.setUserHasDrewOnce(gameId);
        return res.status(HttpCode.OK).json({
          message: "cardId is NaN (not a number) => draw one card",
        });
      }
    }

    // validate the card and its existence
    if (cardId < 1 || cardId > 108) {
      return res.status(HttpCode.BadRequest).json({
        error: "invalid cardId=" + cardId + ", it should be beetween 1-108",
      });
    }
    findCard: {
      for (const card of status.current_user_cards) {
        if (card.id == cardId) {
          break findCard;
        }
      }
      return res.status(HttpCode.NotFound).json({
        message: "user doesn't have the card with cardId=" + cardId,
      });
    }

    await GamesDB.deleteOneCard(gameId, userId, cardId);
    await GamesDB.setLastUserAndCard(gameId, userId, cardId);

    // TODO increase turn count + card check logic
    return res.status(HttpCode.OK).json({
      message: "You just played a card (no logic check yet)",
    });
  } catch (err) {
    return res.status(HttpCode.InternalServerError).json({ error: err });
  }
};

export { getGameCurrentStatus, playGame };
