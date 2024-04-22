import path from "path";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import * as Routes from "./routes";
import * as TestRoutes from "./test_pages/test_routes";
import * as Session from "./middleware/session";
import { requestTime } from "./middleware/timestamp";
import { isAuthenticated } from "./middleware/check_auth";
import { handleSocketConnection } from "./middleware/socket_connect";
import { setUpDevelopmentEnvironment } from "./utilities/setup_development_environment";

const app = express();
const httpServer = createServer(app);

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

  setUpDevelopmentEnvironment();

  app.use(
    require("connect-livereload")({
      port: 35729,
    })
  );

  app.use(requestTime);
}

const PORT = process.env.PORT || 3333;

const BACKEND_PATH = path.dirname(__dirname);
const STATIC_PATH = path.join(BACKEND_PATH, "static");
const VIEW_PATH = path.join(BACKEND_PATH, "views");
// console.log(VIEW_PATH);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", VIEW_PATH);
app.set("view engine", "ejs");
app.use(express.static(STATIC_PATH));

// Setup express session
app.use(Session.config);
app.use(Session.setToLocal);
if (process.env.NODE_ENV === "development") {
  app.use(Session.logToConsole);
}

// handle cross origin request
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Setup socket IO
const io = new Server(httpServer, {
  cors: corsOptions,
});
io.engine.use(Session.config);
app.set("io", io);
io.on("connection", handleSocketConnection);

// log request URL's origin
app.use((req, res, next) => {
  console.log(
    `[server.ts] Incoming request -  METHOD:${req.method} ORIGIN:${req.headers.origin} URL:${req.url}`
  );
  next();
});

app.use(Routes.user);
app.use("/lobby", isAuthenticated, Routes.lobby);
app.use("/game", isAuthenticated, Routes.game);

// test routes
app.use("/test", TestRoutes.root);
app.use("/test/lobby", isAuthenticated, TestRoutes.lobby);
app.use("/test/game", isAuthenticated, TestRoutes.game);
app.use("/test/time", isAuthenticated, TestRoutes.logTime);

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
