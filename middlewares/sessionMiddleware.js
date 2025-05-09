import session from "express-session";
import { configDotenv } from "dotenv";
configDotenv();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "lax",
  },
});
