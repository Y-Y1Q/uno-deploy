/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("game_cards", {
    game_id: {
      type: "int",
      notNull: true,
      references: "games(id)",
      onDelete: "cascade",
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
    },
    card_id: {
      type: "int",
      references: "cards(id)",
      onDelete: "cascade",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("game_cards");
};
