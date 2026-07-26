// Packages
import Router from "express";

// Files
import authJWT from "../middleware/authJWT.js";
import {
  getUser,
  postRegister,
  postLogIn,
} from "../controllers/authControllers.js";

// Authentication routes:
const authRoutes = Router();

authRoutes.get("/user", authJWT, getUser);
authRoutes.post("/register", postRegister);
authRoutes.post("/log-in", postLogIn);

export default authRoutes;
