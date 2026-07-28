// Packages
import prisma from "../../lib/prisma.js";
import { body, matchedData, validationResult } from "express-validator";

// Register from validation chain
const registerValidation = [
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

    try {
        const registration = await prisma.character.create({ // Character should change to ranking
            data: {
                username: username,
            }
        })

        return res.status(201).json(registration); // Time is still missing
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not register user." });
    }
  },
];
