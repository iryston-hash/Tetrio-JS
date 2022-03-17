document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#button__start");
  const width = 10;

  //The bricks layuots , help me please x.x
  const brickL = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const brickZ = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const brickT = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const brickB = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const brickI = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const bricks = [brickL, brickB, brickI, brickZ, brickT];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * bricks.length);
  let current = bricks[random][currentRotation];
  // draw
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("brick");
    });
  }
  draw();
  // undraw
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("brick");
    });
  }

  // freefall logic
  timerId = setInterval(freefall, 1000);
  // controlls

function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
} else if (e.keyCode === 39) {
    rotate()
} else if (e.keyCode === 38) {
    moveRight()
} else if (e.keyCode === 40 ) {
    moveDown()
  }
}
document.addEventListener('keyup', control)



  function freefall() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      random = Math.floor(Math.random() * bricks.length);
      current = bricks[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }
  //grid borders
  function moveLeft() {
    undraw();
    const leftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!leftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    )
      currentPosition += 1;
  }
  draw();
});
