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
    last_user: {
      type: "int",
      references: "users(id)",
      onDelete: "cascade",
      default: null
    },
    last_card: {
      type: "int",
      notNull: true,
      references: "cards(id)",
      onDelete: "cascade",
      default: 1
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
  });
};

exports.down = (pgm) => {
  pgm.dropTable("games");
};
