import pgSession from "connect-pg-simple";
import expressSession from "express-session";

import { db } from "../db/db_connection";

// extend the SessionData to include 'user' type
// this will allow us to access user data in session
declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      username: string;
      fullName: string;
    };
  }
}

// create a session store using connect-pg-simple with PostgreSQL
const sessionStore = pgSession(expressSession);

// configuration for express-session middleware
const config = expressSession({
  store: new sessionStore({
    pool: db.$pool,
    createTableIfMissing: true,
  }),
  secret: process.env.SECRET || "667uno",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  }, // 1 day
});

// to log session data to console
const logToConsole = (req, res, next) => {
  if (req.session.user !== undefined) {
    console.log("Session data: " + JSON.stringify(req.session));
  }
  next();
};

// the following getter will have user object
// { isAuthenticated } in check_auth.ts will check it first in express routes
const getCurrentUser = (req) => {
  return req.session.user;
};

export { config, logToConsole, getCurrentUser };
