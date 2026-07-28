// Packages
import { Router } from "express"

// Files
import { postRegister } from "./registerRoutes.js"

const registerRoutes = Router();

registerRoutes.post("/", postRegister);

export default registerRoutes;