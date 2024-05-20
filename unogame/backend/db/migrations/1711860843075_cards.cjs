/* eslint-disable camelcase */

exports.shorthands = undefined;

const Color = {
  [0]: "Red",
  [1]: "Green",
  [2]: "Blue",
  [3]: "Yellow",
};

const Type = {
  [10]: "Skip",
  [11]: "Reverse",
  [12]: "Draw",
  [13]: "Wild",
  [14]: "Wild_Draw",
};

exports.up = (pgm) => {
  pgm.createTable("cards", {
    id: "id",
    color: { type: "int" },
    type: { type: "int" },
    name: { type: "varchar(50)" },
  });

  const cardValues = [];

  // create a set of 108 Uno cards in database
  // note: 4 colors, 15 types
  for (let color = 0; color < 4; color++) {
    let name = "";

    // Number 0
    cardValues.push({ color, type: 0, name: `cards/${Color[color]}_0.png` });

    // Number 1 - 9, Skip, Reverse, Draw 2 have two sets in each color
    for (let type = 1; type <= 12; type++) {
      if (type < 10) {
        // 1 - 9
        cardValues.push({
          color,
          type,
          name: `cards/${Color[color]}_${type}.png`,
        });
        cardValues.push({
          color,
          type,
          name: `cards/${Color[color]}_${type}.png`,
        });
      } else {
        // Skip, Reverse, Draw 2
        cardValues.push({
          color,
          type,
          name: `cards/${Color[color]}_${Type[type]}.png`,
        });
        cardValues.push({
          color,
          type,
          name: `cards/${Color[color]}_${Type[type]}.png`,
        });
      }
    }

    // Check card type directly for wild card, ignore card color
    cardValues.push({ color, type: 13, name: `cards/${Type[13]}.png` }); // Wild
    cardValues.push({ color, type: 14, name: `cards/${Type[14]}.png` }); // Wild Draw 4
  }

  pgm.sql(`
  INSERT INTO cards (color, type, name)
  VALUES ${cardValues.map(({ color, type, name }) => `(${color}, ${type}, '${name}')`).join(",")}
`);
};

exports.down = (pgm) => {
  pgm.dropTable("cards");
};
