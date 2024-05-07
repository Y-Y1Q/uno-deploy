/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("session", {
    sid: {
      type: "varchar",
      notNull: true,
      primaryKey: true,
      deferrable: false,
    },
    sess: {
      type: "json",
      notNull: true,
    },
    expire: {
      type: "timestamp(6)",
      notNull: true,
    },
  });
  pgm.createIndex("session", "expire");
};

exports.down = (pgm) => {
  pgm.dropIndex("session", "expire");
  pgm.dropTable("session");
};
