import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
dotenv.config({ path: ".env" });
import { errorMiddleware } from "./src/errorHandle/middleware";
import { logger } from "./src/errorHandle/configLogger";
import passport from "passport";
import passportGG from "passport-google-oauth20";
import cookieSession from "cookie-session";
import User from "./src/api/models/user/userModel";
import keys from "./src/ultis/keys";
import { createServer } from "http";
import { Server } from "socket.io";

// Import Router
import petRouter from "./src/api/routers/petRouter";
import userRouter from "./src/api/routers/userRouter";
import postRouter from "./src/api/routers/postRouter";
import loginGG from "./src/api/routers/configLoginGG";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));
app.use(morgan("dev"));
app.use(errorMiddleware);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.coockieKeys] as any,
  })
);

// Config socket.io
const server = createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket: any) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data: any) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  // logger.info(`Can't find ${req.originalUrl} on this sever!`);
  next();
});

app.use("/", loginGG);
app.use("/api/v1/pets", petRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
