import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";
import * as UserDB from "../../db/db_users";
import { unoMsg } from "../chat/send_admin_msg";
import { gameStateUpdate } from "../socket/game_state";

async function unoHandler(gameId, userId, req) {
  await GamesDB.drawCards(gameId, userId, 2);
  await unoMsg(gameId, userId, "didn't say UNO! Drew 2 penalty cards", req);
  await gameStateUpdate(gameId, userId, req);
}

function castColor(colorStr) {
  switch (colorStr.toLowerCase()) {
    case "red":
      return 0;
    case "green":
      return 1;
    case "blue":
      return 2;
    case "yellow":
      return 3;
    default:
      return null;
  }
}

async function castCard(cardId) {
  let color;
  switch (Math.floor((cardId - 1) / 27)) {
    case 0:
      color = "red";
      break;
    case 1:
      color = "green";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "yellow";
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

  const { name: path } = await GamesDB.getCardImgPath(cardId);

  return { id: cardId, color: color, type: type, path };
}

async function getAndCastGameStatus(gameId, userId) {
  const status = await GamesDB.getGameStatus(gameId);

  let last_card_played = await castCard(status.last_card_played);
  const user_ids = await GamesDB.getUsersInGame(gameId);

  // get user for this turn
  let user_index = 0;
  if (status.last_user != null) {
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
  const current_user_cards = await Promise.all(
    (await GamesDB.getUserCards(gameId, userId)).map(
      async (card) => await castCard(card)
    )
  );

  let playable_cards_index = null;
  const user_this_turn = user_ids[user_index];
  if (userId == user_this_turn) {
    playable_cards_index = [];

    // For testing
    // All cards playable
    // for (let i = 0; i <= current_user_cards.length; i++) {
    //   playable_cards_index.push(i);
    // }

    if (
      current_user_cards.length == 1 &&
      current_user_cards[0].type == "wild & draw 4"
    ) {
      // not allowing wild & draw 4 as the last card
    } else {
      for (let i = 0; i < current_user_cards.length; i++) {
        const card = current_user_cards[i];

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

  const counts = await GamesDB.getAllUserCardCounts(gameId);
  const everyone_counts = [];
  for (const user of user_ids) {
    let count = counts[String(user)];
    everyone_counts.push({
      id: user,
      count: count == undefined ? 0 : count,
    });
  }

  const opponent_info = await GamesDB.getOpponentInfo(gameId, userId);

  const { username: user_this_turn_name } =
    await UserDB.getUserById(user_this_turn);

  return {
    everyone_counts,
    max_players: status.max_players,
    is_clockwise: status.is_clockwise,
    penalty: status.penalty,
    last_user: status.last_user,
    last_card_played: last_card_played,
    user_this_turn,
    user_this_turn_name,
    playable_cards_index,
    current_user_cards,
    opponent_info,
  };
}

const getGameCurrentStatus = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  return res
    .status(HttpCode.OK)
    .json(await getAndCastGameStatus(gameId, userId));
};

const playGame = async (req, res) => {
  const { card_index: cardIndexStr, wild_color: colorStr } = req.body;
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  try {
    const status = await getAndCastGameStatus(gameId, userId);
    for (const count of status.everyone_counts) {
      if (count.count == 0) {
        return res.status(HttpCode.Forbidden).json({
          error: "Someone wins already with userId=" + String(count.id),
        });
      }
    }

    // validate the user for current turn
    if (status.playable_cards_index == null) {
      return res.status(HttpCode.BadRequest).json({
        error: "It is not your turn!",
      });
    }

    const cardIndex = parseInt(cardIndexStr);

    // draw card(s)
    if (Number.isNaN(cardIndex)) {
      let msg = "";

      if (status.penalty > 0) {
        await GamesDB.drawCards(gameId, userId, status.penalty);
        await GamesDB.setPenalty(gameId, 0);
        msg = "Drawing penalty cards";
      } else {
        await GamesDB.drawCards(gameId, userId, 1);
        msg = "Drawing one card";
      }

      await GamesDB.setLastUserOnly(gameId, userId);
      await gameStateUpdate(gameId, userId, req);
      return res.status(HttpCode.OK).json({
        message: msg + ", the user also miss the turn",
      });
    }

    // validate the card
    if (cardIndexStr < 0 || cardIndexStr >= status.current_user_cards.length) {
      return res.status(HttpCode.BadRequest).json({
        error: "Invalid card_index=" + cardIndex,
      });
    }
    if (!status.playable_cards_index.includes(cardIndex)) {
      return res.status(HttpCode.BadRequest).json({
        error: "The clicked card is not playable!!!",
      });
    }

    // CASE: didn't say UNO
    const cardLeft = status.current_user_cards.length;
    const { uno: unoDeclared } = await GamesDB.checkUno(gameId, userId);
    if (cardLeft === 1 && !unoDeclared) {
      unoHandler(gameId, userId, req);
      return res.status(HttpCode.OK);
    }

    const card = status.current_user_cards[cardIndex];
    console.log("===BEFORE=== CARD ID TO DELETE: " + card.id);
    console.log("===BEFORE=== CARD INDEX: " + cardIndex);
    let oldCardId = "";

    if (card.type == "wild" || card.type == "wild & draw 4") {
      let color = castColor(colorStr);

      if (color == null) {
        return res.status(HttpCode.BadRequest).json({
          error:
            "invalid color: " +
            colorStr +
            ", acceptable colors are red, yellow, blue, green",
        });
      }

      const newCard = await castCard(
        color * 27 + (card.type == "wild" ? 26 : 27)
      );
      oldCardId = card.id;
      card.id = newCard.id;
      card.color = newCard.color;
      if (card.type != newCard.type) {
        return res.status(HttpCode.InternalServerError).json({
          error: "error in wild card id computation (MUST BE DEBUGGED)",
        });
      }
    }

    switch (card.type) {
      case "reverse":
        await GamesDB.toggleReverse(gameId);
        break;
      case "draw 2":
        await GamesDB.setPenalty(gameId, status.penalty + 2);
        break;
      case "wild & draw 4":
        await GamesDB.setPenalty(gameId, status.penalty + 4);
        break;
    }

    console.log("===AFTER=== CARD ID TO DELETE: " + card.id);

    if (card.type == "wild" || card.type == "wild & draw 4") {
      await GamesDB.deleteOneCard(gameId, userId, oldCardId);
    } else {
      await GamesDB.deleteOneCard(gameId, userId, card.id);
    }

    await GamesDB.setLastUserAndCard(gameId, userId, card.id);

    await gameStateUpdate(gameId, userId, req);
    return res.status(HttpCode.OK).json({
      message: "You played a card",
    });
  } catch (err) {
    return res.status(HttpCode.InternalServerError).json({ error: err });
  }
};

export { getGameCurrentStatus, playGame, getAndCastGameStatus };
