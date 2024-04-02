/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("game_cards", {
        game_id: {
            type: "int",
            notNull: true,
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
            type: "int",
        }
    });

    // add unique foreign key columns after creating the table
    // to avoid a conflict (can't refer when creating table)
    pgm.addConstraint("game_cards", "fk", {
        foreignKeys: {
            columns: ["game_id", "user_id"],
            references: "game_users (game_id, user_id)",
            onDelete: "cascade"
        }
    });
};

exports.down = pgm => {
    pgm.dropTable("game_cards");
};