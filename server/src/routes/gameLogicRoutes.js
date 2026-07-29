// Packages
import { Router } from "express";

// Files
import {
  getCharacters,
  postStartTime,
  postGuess,
  postRegister,
  getRanking,
} from "../controllers/gameLogicControllers.js";

const gameLogicRoutes = Router();

gameLogicRoutes.get("/characters", getCharacters);
gameLogicRoutes.post("/start-time", postStartTime);
gameLogicRoutes.post("/guess", postGuess);
gameLogicRoutes.post("/register", postRegister);
gameLogicRoutes.get("/ranking", getRanking);

export default gameLogicRoutes;