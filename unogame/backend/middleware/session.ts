import expressSession from "express-session";
import pgSession from "connect-pg-simple";
import { db } from "../db/db_connection";

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
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  }, // 1 day
});

// to set session user data to locals for easy access in views
const setToLocal = (req, res, next) => {
  res.locals.user = req.session.user;

  next();
};

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
}

export { config, setToLocal, logToConsole, getCurrentUser, };
