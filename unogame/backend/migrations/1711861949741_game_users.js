/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("game_users", {
        game_id: {
            type: "int",
            notNull: true,
            references: "games(id)",
            onDelete: "cascade"
        },
        user_id: {
            type: "int",
            notNull: true,
            references: "users(id)",
        },
        turn_order: {
            type: "int",
        },
        ready: {
            type: "bool",
            default: false
        }
    });
};

exports.down = pgm => {
    pgm.dropTable("game_users");
};