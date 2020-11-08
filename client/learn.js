console.log(socket);

const nameUser = document.querySelector(".name");
const update = document.querySelector(".who-joined");
const username = window.prompt("Enter your name");

const start = (data) => {
  // console.log(data);
  update.innerHTML = `${data.name} has Joined`;
  window.setTimeout(() => {
    update.innerHTML = "";
  }, 2000);
};

socket.on("who-joined", start); // start bhanne event fire bhayo bhane start bhanne function execute garnu

const dataToSend = { name: username };

socket.emit("joined", dataToSend);

nameUser.innerHTML = username;
