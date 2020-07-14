const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const rooms = ["fire", "water", "ice", "snow", "cake"];
const randomRoomGen = (roomList) => {
  const random = Math.floor(Math.random() * roomList.length);
  return random;
};

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

/////////////////////
// custom namespaces
const js = io.of("/js");
js.on("connection", (socket) => {
  console.log("someone is connecting");
  js.emit("hi", "hello js");
});
//////////////////////

//variables
let connections = 0;
let roomNo = 1;

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
/////////////////////
// custom namespace

io.on("connection", function (socket) {
  console.log("A user connected");

  const message = {
    content: "Hello, Talking from the other side. Hope you are safe and sound",
  };

  setTimeout(() => {
    socket.emit("dummy", message);
  }, 5000);
  connections++;

  /* 
    emit ----> custom events
    on ------> built in events like "message", "connection", "disconnect"
  */

  ////////////////////////
  // Will only let 2 people in a room
  // if (
  //   io.nsps["/"].adapter.rooms[rooms[roomNo]] &&
  //   io.nsps["/"].adapter.rooms[rooms[roomNo]].length > 1
  // ) {
  //   roomNo++;
  // }
  ////////////////////////

  roomNo = randomRoomGen(rooms);
  socket.join(rooms[roomNo]);

  io.sockets
    .in(rooms[roomNo])
    .emit("connectBruh", "You are in room " + rooms[roomNo]);

  // sends message only to the client that just joined
  socket.emit("welcome", { message: "Hello" });
  socket.leave(rooms[roomNo]);

  // sends message to everyone but the new client
  socket.broadcast.emit("welcome", {
    message: "New User Has Connected. Say Hi!",
  });

  //sends the message to everyone (even the client that fired the event)
  io.sockets.emit("broadcast", { desc: connections + " clients connected!" });

  socket.on("fromClient", (data) => console.log(data));

  //////////////////
  // canvas event
  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
    console.log(data);
  });

  socket.on("end", (data) => {
    socket.broadcast.emit("end", data);
    // console.log(data);
  });
  /////////////////

  ///////////////////
  // errore event
  // setTimeout(() => {
  //   socket.emit("connect_failed", { message: "unknown" });
  // }, 5000);
  ///////////////////

  // on disconnecting
  socket.on("disconnect", function () {
    connections--;
    console.log("A user disconnected");
  });
});
///////////////////////

///////////////////////
// starting the server
const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log(`listening on PORT ${PORT}`);
});
//////////////////////
