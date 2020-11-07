console.log("Hi");
// const welcome = document.querySelector(".welcome");
const randomRoomGen = (roomList) => {
  const random = Math.floor(Math.random() * roomList.length);
  return random;
};

// const colors = ["purple", "red", "yellow", "lime", "black"];
// const index = randomRoomGen(colors);
// let color = colors[index];
// console.log(color);

window.addEventListener("load", () => {
  let cursor = "pencil";
  let color = "black";
  let activeColor = color;

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const eraser = document.querySelector(".eraser");
  const pencil = document.querySelector(".pencil");
  const brushSize = document.querySelector("#brush-size");
  const colorPicker = document.querySelector(".color");

  // console.log("Brush" + "=" + brushSize.value);
  let brushStroke = brushSize.value;

  brushSize.addEventListener("change", (e) => (brushStroke = e.target.value));

  // console.log(color);

  colorPicker.addEventListener("change", (e) => {
    activeColor = e.target.value;
    color = e.target.value;
    console.log("target = " + e.target.value);
  });

  eraser.addEventListener("click", () => {
    eraser.style.color = "white";
    pencil.style.color = "black";
    cursor = "eraser";
    color = "#444444";
    console.log(color);
  });

  pencil.addEventListener("click", () => {
    pencil.style.color = "white";
    eraser.style.color = "black";
    cursor = "pencil";
    color = activeColor;
    console.log(color);
  });

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  console.log(color);

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
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    ctx.strokeStyle = color;

    ctx.lineWidth = brushStroke;
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
