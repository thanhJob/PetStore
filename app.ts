import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
dotenv.config({ path: ".env" });
import { errorMiddleware } from "./src/errorHandle/middleware";
import { logger } from "./src/errorHandle/configLogger";
import cookieSession from "cookie-session";
import keys from "./src/ultis/keys";
import { createServer } from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Import Router
import petRouter from "./src/api/routers/petRouter";
import userRouter from "./src/api/routers/userRouter";
import postRouter from "./src/api/routers/postRouter";
import loginGG from "./src/api/routers/configLoginGG";
import cmtRouter from "./src/api/routers/commentRouter";
import cartRouter from "./src/api/routers/cartRouter";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname)));
app.use(morgan("dev"));
app.use(errorMiddleware);
app.use(helmet());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.coockieKeys] as any,
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/api", apiLimiter);

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
app.use("/api/v1/comments", cmtRouter);
app.use("/api/v1/carts", cartRouter);

export default app;
