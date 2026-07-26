// Packages
import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Files
import prisma from "../../lib/prisma.js";

// Register validation chain:
const registerValidation = [
    
]

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    return res.json(user);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Could not get user's data." });
  }
};

export const postRegister = [
  registerValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, email, password } = matchedData(req);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: "Could not create user." });
    }
  },
];

export const postLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.statu(404).json({ error: "Could not find user." });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Incorrect credentials. " });
    }

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Could not log in user." });
  }
};