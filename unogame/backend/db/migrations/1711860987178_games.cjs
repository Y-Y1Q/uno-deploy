/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("games", {
    id: "id",
    room_name: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    max_players: {
      type: "int",
      notNull: true,
      default: 4,
    },
    started: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    is_clockwise: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    current_turn: {
      type: "int",
      notNull: true,
      default: 0,
    },
    current_penalty: {
      type: "int",
      notNull: true,
      default: 0,
    },
    last_card: {
      type: "int",
      notNull: true,
      references: "cards(id)",
      onDelete: "cascade",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("games");
};
