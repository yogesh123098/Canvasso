const moonPath =
  "M153.5 264.5C226.46 379.764 379.957 417.651 379.957 417.651C264.693 490.611 112.108 456.316 39.1481 341.053C-33.8116 225.789 0.482773 73.2034 115.747 0.243774C115.747 0.243774 80.5403 149.236 153.5 264.5Z";

const sunPath =
  "M494 247C494 383.414 383.414 494 247 494C110.586 494 0 383.414 0 247C0 110.586 110.586 0 247 0C383.414 0 494 110.586 494 247Z";

const spreadPath =
  "M2596 1298C2596 2014.87 2014.87 2596 1298 2596C581.134 2596 0 2014.87 0 1298C0 581.134 581.134 0 1298 0C2014.87 0 2596 581.134 2596 1298Z";

const tools = document.querySelector(".tool");

const icon = document.querySelector("#darkmode");

let isDark = true;

icon.addEventListener("click", () => {
  const timeline = anime.timeline({
    duration: 600,
    easing: "easeOutExpo",
  });

  timeline
    .add({
      targets: ".sun",
      d: [{ value: isDark ? sunPath : moonPath }],
      fill: isDark ? "#FFF741" : "rgb(255,255,255)",
    })
    .add(
      {
        targets: "#darkmode",
        rotate: isDark ? 350 : 320,
      },
      "-=500"
    )
    .add(
      {
        targets: "body",
        backgroundColor: isDark ? "rgb(255,255,255)" : "#444444",
      },
      "-=400"
    )
    .add(
      {
        targets: ".tool",
        color: isDark ? "rgb(22,22,22)" : "rgb(250,250,250)",
      },
      "-=400"
    )
    .add(
      {
        targets: ".black-dot",
        backgroundColor: !isDark ? "rgb(255,255,255)" : "#444444",
      },
      "-=400"
    )
    .add(
      {
        targets: ".status",
        color: isDark ? "rgb(22,22,22)" : "rgb(250,250,250)",
      },
      "-=400"
    );

  isDark = !isDark;
});

// var path = anime.path(".sun");

// anime({
//   targets: "svg",
//   translateX: 100,
//   easing: "linear",
//   duration: 2000,
//   loop: true,
// });

// icon.addEventListener("click", () => {
//   const timeline = anime.timeline({
//     duration: 1000,
//     easing: "easeOutExpo",
//   });
//   timeline
//     .add({
//       targets: "#darkmode",
//       width: 1920,
//       height: 1080,
//     })
//     .add(
//       {
//         targets: ".theme",
//         r: 250,
//       },
//       "-=750"
//     )
//     .add({
//       targets: ".main",
//       backgroundColor: "#FFF741",
//       complete: () => (icon.style.zIndex = -1),
//     });
// });

{
  /* <svg
  width="1920"
  height="1080"
  viewBox="0 0 1920 1080"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="959.5" cy="539.5" r="1138.5" fill="#FFF741" />
</svg>; */
}

{
  /* <svg
  width="380"
  height="456"
  viewBox="0 0 380 456"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M153.5 264.5C226.46 379.764 379.957 417.651 379.957 417.651C264.693 490.611 112.108 456.316 39.1481 341.053C-33.8116 225.789 0.482773 73.2034 115.747 0.243774C115.747 0.243774 80.5403 149.236 153.5 264.5Z"
    fill="#FFD558"
  />
</svg>; */
}
