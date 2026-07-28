// Packages
import { Router } from "express";

// Files
import { getCharacters } from "../controllers/charactersControllers.js";

const charactersRoutes = Router();

charactersRoutes.get("/", getCharacters);

export default charactersRoutes;
