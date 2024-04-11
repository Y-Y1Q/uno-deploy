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
            // use 0 to represent for draw pile
            // use -1 for discard pile
            // removed fk for user_id
        },
        card_id: {
            type: "int",
        },
        card_order: {
            type: "serial",
        }
    });

    // add unique foreign key columns after creating the table
    // to avoid a conflict (can't refer when creating table)
    pgm.addConstraint("game_cards", "fk", {
        foreignKeys: {
            columns: ["game_id"],
            references: "games(id)",
            onDelete: "cascade"
        }
    });
};

exports.down = pgm => {
    pgm.dropTable("game_cards");
};