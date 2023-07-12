const express = require("express");
const app = express();
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
const doctorRoutes = require("./routes/doctor.js");
const conversationRoutes = require("./routes/conversations.js");
const messageRoutes = require("./routes/messages.js");
const connection = require("./database/connection");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//     // origin: [
//     //   "http://dochere.online",
//     //   "http://www.dochere.online",
//     //   "http://3.110.107.190",
//     // ],
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dochere.online",
      "https://www.dochere.online",
      "https://server.dochere.online",
      "https://3.110.107.190",
    ], //frontEndURL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "images")));
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);

try {
  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    // console.log("a user connected");
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);

      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    socket.on("disconnect", () => {
      // console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
} catch (error) {
  console.log(error.message);
}

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`port running on port ${process.env.PORT}`);
  }
});
