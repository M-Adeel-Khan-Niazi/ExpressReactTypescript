import { Server, createServer } from "http";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();
import app from "./app";
import mongoose from "mongoose";

const server: Server = createServer(app);
const port = Number(process.env.PORT || 8000);

mongoose
  .connect(process.env.MONGO_DB_URL as string)
  .then(() => {
    console.log("Database connected!");
    server.listen(port, () => {
      console.log("Express server started on port: " + port);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database => " + err);
  });
