import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

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

  return { id: cardId, color: color, type: type };
}

const getGameCurrentStatus = async (req, res) => {
  const { id: gameId } = req.params;

  const status = await GamesDB.getGameStatus(gameId);
  const user_ids = await GamesDB.getUsersInGame(gameId);
  const turn_order = status.turn % status.count;

  return res.status(HttpCode.OK).json({
    user_id: user_ids[turn_order],
    last_card: castCard(status.last_card),
  });
};

const playGame = async (req, res) => {
  const { card_id: cardIdStr, wild_color: colorStr } = req.body;
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  try {
    // validate the user for current turn
    const status = await GamesDB.getGameStatus(gameId);
    const user_ids = await GamesDB.getUsersInGame(gameId);
    if (userId != user_ids[status.turn % status.count]) {
      return res.status(HttpCode.BadRequest).json({
        error: "it is not the turn for userId=" + userId,
      });
    }

    const cardId = parseInt(cardIdStr);

    // draw a card
    if (Number.isNaN(cardId)) {
      await GamesDB.drawCards(gameId, userId, 1);
      return res.status(HttpCode.OK).json({
        message: "cardId is NaN (not a number) => draw one card",
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

    return res.status(HttpCode.OK).json({
      message: "TODO: already pass card check, todo for the play round logicA",
    });
  } catch (err) {
    return res.status(HttpCode.InternalServerError).json({ error: err });
  }
};

export { getGameCurrentStatus, playGame };
