// Packages
import prisma from "../../lib/prisma.js";

export const postGuess = async (req, res) => {
  const { x, y, guessedCharacterId } = req.body;

  try {
    if (!x || !y) {
      console.error("Coordinates are not defined");
      return res.status(400).json({ error: "Missing coordinates" });
    }

    if (!guessedCharacterId) {
      console.error("Character is not defined");
      return res.status(400).json({ error: "Missing character" });
    }

    const guessedCharacter = await prisma.character.findUnique({
      where: {
        id: guessedCharacterId,
      },
    });

    if (!guessedCharacter) {
      console.error("Could not find character");
      return res.status(404).json({ error: "Could not find character." });
    }

    const minX = guessedCharacter.minX;
    const maxX = guessedCharacter.maxX;
    const minY = guessedCharacter.minY;
    const maxY = guessedCharacter.maxY;

    if (minX <= x && maxX >= x && minY >= y && maxY <= y) {
      return res
        .staus(200)
        .json(guessedCharacter.id);
    } else {
      return res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not guess character." });
  }
};
