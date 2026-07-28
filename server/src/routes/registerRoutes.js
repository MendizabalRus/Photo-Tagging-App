// Packages
import { Router } from "express";

// Files
import { postRegister } from "../controllers/registerControllers.js";

const registerRoutes = Router();

registerRoutes.post("/", postRegister);

export default registerRoutes;
