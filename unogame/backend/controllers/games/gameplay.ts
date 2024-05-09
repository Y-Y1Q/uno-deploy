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

  // TEST
  status.last_user = 0;

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
      let card_list =
        status.last_card_drew == null
          ? current_user_cards
          : [castCard(status.last_card_drew)];

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
    }
  }

  return {
    max_players: status.max_players,
    is_clockwise: status.is_clockwise,
    penalty: status.penalty,
    last_user: status.last_user,
    last_card_played: last_card_played,
    user_chose_to_draw: status.last_card_drew != null,
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
    if (userId != status.user_this_turn) {
      return res.status(HttpCode.BadRequest).json({
        error: "it is not the turn for userId=" + userId,
      });
    }

    const cardId = parseInt(cardIdStr);

    // draw a card
    if (Number.isNaN(cardId)) {
      await GamesDB.drawCards(gameId, userId, 1 + status.penalty);
      // TODO when drawing one card, only that card is playable
      if (status.penalty > 0) {
      } else {
      }
      return res.status(HttpCode.OK).json({
        message:
          "cardId is NaN (not a number) => draw card with coutn as 1 + penalty.",
      });
    }

    // validate the card and its existence
    if (cardId < 1 || cardId > 108) {
      return res.status(HttpCode.BadRequest).json({
        error: "invalid cardId=" + cardId + ", it should be beetween 1-108",
      });
    }
    if (!(await GamesDB.userHasCard(gameId, userId, cardId))) {
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
