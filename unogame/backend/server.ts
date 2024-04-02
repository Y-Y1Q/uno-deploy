import path from "path";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as Routes from "./routes";
import * as TestRoutes from "./test_pages/test_routes";
import * as Session from "./middleware/session";
import { isAuthenticated } from "./middleware/check_auth";
import { setUpDevelopmentEnvironment } from "./utilities/setup_development_environment";

const app = express();

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

  setUpDevelopmentEnvironment();

  app.use(
    require("connect-livereload")({
      port: 35729,
    })
  );
}

const PORT = process.env.PORT || 3333;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");
app.use(express.static(path.resolve("static")));

app.use(Session.config);

// Todo, learn socket.io

app.use(Routes.user);
app.use(Routes.game);

// test routes
app.use(TestRoutes.root);
app.use("/lobby", isAuthenticated, TestRoutes.lobby);
app.use("/time", isAuthenticated, TestRoutes.logTime);
app.use("/roomcreate", TestRoutes.game);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
