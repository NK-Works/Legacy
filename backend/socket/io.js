// socket/io.js
const { Server } = require("socket.io");
const db = require("../models"); // Import the database models

let io; // Store the io instance

function init(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust as needed for your frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join", (room) => {
      console.log(`user joined room: ${room}`);
      socket.join(room);
    });

    socket.on("leave", (room) => {
      console.log(`user left room: ${room}`);
      socket.leave(room);
    });

    socket.on("chat message", async (msg) => {
      console.log(`message: ${msg.content}`);
      try {
        const newMessage = await db.ChatMessage.create({
          content: msg.content,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          productId: msg.productId,
        });
        // Use the io instance to emit
        io.to(msg.productId).emit("chat message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

module.exports = { init, getIO };
