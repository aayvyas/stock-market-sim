import express, { Application, Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { getUpdates } from "./consume";

const app: Application = express();
// @ts-ignore
const server = createServer(app, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
const io = new Server(server);

// TODO
// Prepare a key value pair, onConnection for that particular groupId(stockId) a message will broadcast to all the connections

io.on("connection", async (socket) => {
  console.log("Client connected with Socket Id", socket.id);
  io.to(socket.id).emit("connection", `Thanks for joining`);
  socket.on("join", async (room: string) => {
    console.log("Making the user join ", room);
    socket.join(room.toString());
  });
});

server.listen(3000, async () => {
  console.log("Started server.....");
  await getUpdates(io);
});
