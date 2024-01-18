const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const { Server } = require("socket.io");

// app.use(express.static(path.resolve("./public"))) //This will by default loads the index.html file

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("user-message", (message) => {
    socket.broadcast.emit("send-to-everyone", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"), function (err) {
    if (err) {
      console.log(err);
    }
  }); //because of express.static this line won't change anything
  console.log("hello");
});
server.listen(9000, console.log("server listening on port 9000"));
