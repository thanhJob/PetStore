import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket: any) => {
  socket.on("event", (from: any, msg: any) => {
    io.emit("event", from, msg);
  });
});
