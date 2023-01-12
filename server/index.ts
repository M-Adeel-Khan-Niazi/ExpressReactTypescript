import { Server, createServer } from "http";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();
import app from "./app";
import mongoose from "mongoose";
import http from "http";
import io from "socket.io";

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
// io.on("connection", (socket) => {
//   /* socket object may be used to send specific messages to the new connected client */
//   console.log("new client connected");
//   socket.emit("connection", null);
// });
