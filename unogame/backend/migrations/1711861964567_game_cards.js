/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("game_cards", {
        game_id: {
            type: "int",
            notNull: true,
            references: "games(id)",
            onDelete: "cascade"
        },
        user_id: {
            type: "int",
            notNull: true,
        },
        card_id: {
            type: "int",
            references: "cards(id)",
        },
        card_order: {
            type: "int"
        }
    });
};

exports.down = pgm => {
    pgm.dropTable("game_cards");
};