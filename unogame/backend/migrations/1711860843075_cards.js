/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("cards", {
        id: "id",
        color: { type: "int" },
        type: { type: "int" }
    });

    const cardValues = [];

    for (let color = 0; color < 4; color++) {
        for (let type = 0; type < 15; type++) {
            cardValues.push({ color, type });
        }
    }

    pgm.sql(`
    INSERT INTO cards (color, type)
    VALUES ${cardValues.map(({ color, type }) => `(${color}, ${type})`).join(",")}
  `);
};

exports.down = pgm => {
    pgm.dropTable("cards");
};