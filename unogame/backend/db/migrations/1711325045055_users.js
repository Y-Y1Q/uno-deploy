/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(256)",
      notNull: true,
    },
    fullname: {
      type: "varchar(100)",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    win_count: {
      type: "int",
      default: 0,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
