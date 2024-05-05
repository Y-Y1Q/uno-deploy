import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";
import { Server } from "socket.io";

import * as configure from "./config";
import { isAuthenticated } from "./middleware/check_auth";
import * as Session from "./middleware/session";
import { handleSocketConnection } from "./middleware/socket_connect";
import { requestTime } from "./middleware/timestamp";
import * as Routes from "./routes";
import * as TestRoutes from "./test_pages/test_routes";

const app = express();
const httpServer = createServer(app);
app.use(requestTime);

const UNOGAME_PATH = path.dirname(path.dirname(__dirname));
const STATIC_PATH = path.join(UNOGAME_PATH, "static");
const VIEW_PATH = path.join(UNOGAME_PATH, "frontendV2", "views");
console.log(STATIC_PATH);

configure.liveReload(app, STATIC_PATH);
configure.views(app, VIEW_PATH, STATIC_PATH);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup express session
app.use(Session.config);
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

// POST /signup /login /logout
app.use(Routes.auth);

// POST /chat/:id  /send-inv/:id
app.use(Routes.chat);

// GET website
app.use(Routes.website);

// API for lobby and game
app.use("/lobby", isAuthenticated, Routes.lobby);
app.use("/game", isAuthenticated, Routes.game);

// test routes
app.use("/test", TestRoutes.root);
app.use("/test/lobby", isAuthenticated, TestRoutes.lobby);
app.use("/test/game", isAuthenticated, TestRoutes.game);
app.use("/test/time", isAuthenticated, TestRoutes.logTime);

const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT}, in the ${process.env.NODE_ENV ?? "production"} environment`
  );
});

// log request URL's origin
app.use((req, res, next) => {
  console.log(
    `[server.ts] Incoming request -  METHOD:${req.method} ORIGIN:${req.headers.origin} URL:${req.url}`
  );
  next();
});
