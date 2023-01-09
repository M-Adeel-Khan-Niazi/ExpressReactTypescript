import express, { Application } from "express";
import { join } from "path";
import middleware from "./config/middleware";
import { errorHandler } from "./utils";

import { authRoutes } from "./modules/auth";
import { postRoutes } from "./modules/posts";

const app: Application = express();

middleware(app);

app.use(express.static(join(__dirname, "../client/build")));

app.get("/", function (req, res) {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

app.use("/api/v1", [authRoutes, postRoutes]);

app.use(errorHandler);

export default app;
