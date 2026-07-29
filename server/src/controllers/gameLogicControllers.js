// Packages
import { body, matchedData, validationResult } from "express-validator";

// Files
import prisma from "../../lib/prisma.js";
import { use } from "react";

export const getCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany();

    const modifiedCharacters = characters.map((char) => {
      return {};
    });

    return res.status(200).json(characters);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not get characters." });
  }
};

export const postStartTime = async (req, res) => {
  req.session.game = {
    startTime: Date.now(),
    charactersFound: [],
  };

  console.log(req.session.game);

  return res.status(201).json("Time started");
};

export const postGuess = async (req, res) => {
  const { x, y, id } = req.body;

  console.log(req.session.game);
  try {
    if (!x || !y) {
      console.error("Coordinates are not defined");
      return res.status(400).json({ error: "Missing coordinates" });
    }

    if (!id) {
      console.error("Character id is not defined");
      return res.status(400).json({ error: "Missing character" });
    }

    const guessedCharacter = await prisma.character.findUnique({
      where: {
        id: id,
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

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const characterCoords = minX <= x && maxX >= x && minY >= y && maxY <= y;

    if (!characterCoords) {
      return res.status(200).json("No character found");
    }

    if (characterCoords) {
      if (req.session.game.charactersFound.includes(id)) {
        return res.status(200).json("You had already found that character.");
      }

      if (!req.session.game.charactersFound.includes(id)) {
        req.session.game.charactersFound.push(id);

        if (req.session.game.charactersFound.length === 3) {
          const timeDelta = Date.now() - req.session.game.startTime;

          console.log(req.session.game);
          return res
            .status(200)
            .json({ centerX, centerY, id: guessedCharacter.id, timeDelta });
        }

        return res
          .status(200)
          .json({ centerX, centerY, id: guessedCharacter.id });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not guess character." });
  }
};

// Register from validation chain
export const registerValidation = [
  body("username").trim().notEmpty().isAlphanumeric(),
];

export const postRegister = [
  registerValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username } = matchedData(req);
    const { time } = req.body;

    console.log(username, time);

    try {
      const registration = await prisma.ranking.create({
        data: {
          username: username,
          time: time,
        },
      });

      return res.status(201).json(registration);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not register user." });
    }
  },
];

export const getRanking = async (req, res) => {
  try {
    const ranking = await prisma.ranking.findMany({
      orderBy: {
        time: "asc",
      },
      take: 5,
    });

    return res.status(200).json(ranking)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not fetch ranking." });
  }
};
