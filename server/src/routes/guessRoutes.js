// Packages
import { Router } from "express";

// Files
import { postGuess } from "../controllers/guessControllers.js";

const guessRoutes = Router();

guessRoutes.post("/", postGuess)

export default guessRoutes;