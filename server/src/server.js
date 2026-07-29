// Packages
import express, { urlencoded } from "express";
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

// Files
import gameLogicRoutes from "./routes/gameLogicRoutes.js"

const app = express(); // Declare server

app.use(urlencoded({ extended: true })); // Allow parsing the encoded content of the fetches and makes it available in the routes via a req.body.

app.use(express.json()); // Allow content to be sent in JSON format to the server.

// Create session
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Allow the following origin URLs to send and request data.
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  }),
);

app.use("/images", express.static("public/assets"));

// Route handlers:

app.use("/api/game-logic", gameLogicRoutes)

// Start server
app.listen(8080, (err) => {
  if (err) throw err;
  console.log("\x1b[36m", "Server initialised - http://localhost:8080");
});
