import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

function castCard(cardId) {
  cardId -= 1;

  let color;
  switch (Math.floor(cardId / 27)) {
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

  const typeNumber = cardId % 27;
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

  return { id: cardId + 1, color: color, type: type };
}

async function getGameStatus(gameId, userId) {
  const status = await GamesDB.getGameStatus(gameId);

  if (status.started) {
    status.last_card = castCard(status.last_card);
    const user_ids = await GamesDB.getUsersInGame(gameId);

    let user_index = 0;
    if (status.last_user != null) {
      let step = status.last_card.type == "skip" ? 2 : 1;
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

    const cards = await GamesDB.getUserCards(gameId, userId);

    status["user_this_turn"] = user_ids[user_index];
    status["current_user_cards"] = cards.map((card) => castCard(card));
    return status;
  } else {
    return {
      started: false,
    };
  }
}

const getGameCurrentStatus = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  return res.status(HttpCode.OK).json(await getGameStatus(gameId, userId));
};

// please ignore the red error for status.*
const playGame = async (req, res) => {
  const { card_id: cardIdStr, wild_color: colorStr } = req.body;
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  try {
    // validate the user for current turn
    const status = await getGameStatus(gameId, userId);
    if (userId != status.user_this_turn) {
      return res.status(HttpCode.BadRequest).json({
        error: "it is not the turn for userId=" + userId,
      });
    }

    const cardId = parseInt(cardIdStr);

    // draw a card
    if (Number.isNaN(cardId)) {
      await GamesDB.drawCards(gameId, userId, 1 + status.penalty);
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
    return res.status(HttpCode.OK).json({
      message: "You just played a card (no logic check yet)",
    });
  } catch (err) {
    return res.status(HttpCode.InternalServerError).json({ error: err });
  }
};

export { getGameCurrentStatus, playGame };
