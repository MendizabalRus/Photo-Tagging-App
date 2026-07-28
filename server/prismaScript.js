import prisma from "./lib/prisma.js";

const createChars = async () => {
  await prisma.character.createMany({
    data: [
      {
        name: "Waldo",
        img: "../../assets/waldo.png",
        minX: 750,
        maxX: 795,
        minY: 600,
        maxY: 440,
      },
      {
        name: "Wilma",
        img: "../../assets/wilma.png",
        minX: 315,
        maxX: 360,
        minY: 750,
        maxY: 560,
      },
      {
        name: "Wizard",
        img: "../../assets/wizard.png",
        minX: 1200,
        maxX: 1255,
        minY: 705,
        maxY: 500,
      },
    ],
  });
};

createChars();
