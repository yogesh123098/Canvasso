const socket = io();

/*
localStorage.debug = 'socket.io-client:socket'; 
paste this in browser console for debug
*/

const welcome = document.querySelector(".status");

socket.on("connectBruh", (data) => {
  console.log(data);
  // message.innerHTML = data;
});

socket.on("broadcast", (data) => (welcome.innerHTML = data.desc));

// socket.on("welcome", (data) => {
//   console.log(data.message);
//   message.innerHTML = message.innerHTML + data.message;
//   console.log(message.innerHTML);
// });

socket.on("hi", (data) => document.write(data));

const reply = { reaction: "happily received" };

socket.emit("fromClient", reply);

socket.on("connect_failed", (data) => {
  console.log(data);
  header.innerHTML = "connection Failed! Please check your internet";
});

socket.on("dummy", (data) => {
  console.log(data);
});
