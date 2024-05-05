/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("cards", {
    id: "id",
    color: { type: "int" },
    type: { type: "int" },
  });

  const cardValues = [];

  // create a set of 108 Uno cards in database
  // note: 4 colors, 15 types
  for (let color = 0; color < 4; color++) {
    cardValues.push({ color, type: 0 }); // Number 0

    // Number 1 - 9, skip, reverse, draw 2 will have two sets in each color
    for (let type = 1; type <= 12; type++) {
      cardValues.push({ color, type });
      cardValues.push({ color, type });
    }

    // the colors of wild cards is ignored
    cardValues.push({ color, type: 13 }); // Wild
    cardValues.push({ color, type: 14 }); // Wild Draw 4
  }

  pgm.sql(`
    INSERT INTO cards (color, type)
    VALUES ${cardValues.map(({ color, type }) => `(${color}, ${type})`).join(",")}
  `);
};

exports.down = (pgm) => {
  pgm.dropTable("cards");
};
