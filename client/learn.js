console.log(socket);

const start = (data) => {
  console.log(data);
  //   window.alert(data.message);
};

socket.on("start", start); // start bhanne event fire bhayo bhane start bhanne function execute garnu

const joined = () => {
  return;
};

const dataToSend = { name: "Yogesh", desc: "random desc" };

socket.emit("joined", dataToSend);
