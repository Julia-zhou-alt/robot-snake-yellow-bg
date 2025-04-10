const gameBoard = document.getElementById("game-board");
const snakeIcons = ["👾", "🤖", "🛸", "👽"];
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {
  gameBoard.innerHTML = "";
  snake.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.textContent = snakeIcons[index % snakeIcons.length];
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.textContent = "🍎";
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * 20) + 1,
    y: Math.floor(Math.random() * 20) + 1,
  };
}

function handleKeydown(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
  }
}

window.addEventListener("keydown", handleKeydown);

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

placeFood();
gameLoop();
