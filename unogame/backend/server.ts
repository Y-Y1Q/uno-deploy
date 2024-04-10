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

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");
app.use(express.static(path.resolve("static")));

// Setup express session
const corsOptions = {
  credentials: true,
};
app.use(Session.config);
app.use(Session.setToLocal);
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(Session.logToConsole);
}

// Setup socket IO
const io = new Server(httpServer, {
  cors: corsOptions,
});
io.engine.use(Session.config);
app.set("io", io);
io.on("connection", handleSocketConnection);

app.use(Routes.user);
app.use(Routes.game);
app.use(Routes.chat);

// test routes
app.use("/test", TestRoutes.root);
app.use("/test/lobby", isAuthenticated, TestRoutes.lobby);
app.use("/test/time", isAuthenticated, TestRoutes.logTime);
app.use("/test/game", isAuthenticated, TestRoutes.game);

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
