console.log("Hi");
// const welcome = document.querySelector(".welcome");

const randomRoomGen = (roomList) => {
  const random = Math.floor(Math.random() * roomList.length);
  return random;
};

const colors = ["red", "purple", "yellow", "lime", "black"];
const index = randomRoomGen(colors);
const color = colors[index];
console.log(color);

window.addEventListener("load", () => {
  console.log("starting");
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = 0.9 * window.innerHeight;
  canvas.width = window.innerWidth;

  let drawing = false;

  const start = (e) => {
    drawing = true;
    // welcome.style.opacity = 0;
    draw(e);
  };

  const end = () => {
    socket.emit("end", "end");
    socket.on("end", () => {
      ctx.beginPath();
    });
    drawing = false;
    // welcome.style.opacity = 1;
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    ctx.strokeStyle = color;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    const options = {
      path: { x: e.clientX, y: e.clientY },
      color: ctx.strokeStyle,
    };
    // console.log(path);
    socket.emit("drawing", options);

    socket.on("drawing", (data) => {
      console.log(data);
      ctx.strokeStyle = data.color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineTo(data.path.x, data.path.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(data.path.x, data.path.y);
    });

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mousemove", draw);

  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });
});
