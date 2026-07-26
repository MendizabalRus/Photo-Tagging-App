import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authentication;

  if (!authHeader) {
    return res
      .status(404)
      .json({ error: "Authentication header was not found. " });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ error: "User is not authenticated." });
  }
};
export default authJWT;