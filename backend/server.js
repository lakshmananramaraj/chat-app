const http = require("http");
const socketIo = require("socket.io");
const { syncDatabase, User } = require("./models");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Socket.io setup
const socketObj = {};
const users = [];
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", async (userId) => {
    socket.join(userId);
    users.push(userId);
    console.log(`User ${userId} joined their room`);
    socketObj[socket.id] = userId;
    await User.update(
      { active: true },
      {
        where: {
          id: userId,
        },
      }
    );
    users.map((i) => {
      return i !== userId && io.to(i).emit("fetchContacts", i);
    });
  });

  socket.on("sendMessage", (message) => {
    io.to(message.receiverId).emit("receiveMessage", message);
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id, socketObj);
    if (socketObj[socket.id]) {
      console.log(socketObj);
      let userId = socketObj[socket.id];
      await User.update(
        { active: false },
        {
          where: {
            id: userId,
          },
        }
      );
      users.splice(users.indexOf(userId),1)     
      delete socketObj[socket.id];
    }
  });
});

// Start the server
async function startServer() {
  try {
    await syncDatabase();

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
