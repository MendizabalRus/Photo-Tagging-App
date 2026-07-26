// Packages
import express, { urlencoded } from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

// Files
import authRoutes from "./routes/authRoutes.js";

const app = express(); // Declare server

app.use(urlencoded({ extended: true })); // Allow parsing the encoded content of the fetches and makes it available in the routes via a req.body.

app.use(express.json()); // Allow content to be sent in JSON format to the server.

// Allow the following origin URLs to send and request data.
app.use(
  cors({
    origin: [
      "<web_url>"
    ],
    credentials: true,
  }),
);

// Route handlers:
app.use("/api/auth", authRoutes) // Authentication routes

// Start server
app.listen(8080, (err) => {
  if (err) throw err;
  console.log("\x1b[36m", "Server initialised - http://localhost:8080");
});
