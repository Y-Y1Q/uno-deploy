import expressSession from "express-session";
import pgSession from "connect-pg-simple";
import { db } from "../db/db_connection";

const sessionStore = pgSession(expressSession);

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

const setToLocal = (req, res, next) => {
  res.locals.user = req.session.user;

  next();
};

const logToConsole = (req, res, next) => {
  if (req.session !== undefined) {
    console.log(JSON.stringify(req.session));
  }
  next();
};

export { config, setToLocal, logToConsole };
