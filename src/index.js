import "./style.css";
import { Apple } from "./apple";
import { Snake } from "./snake";
import { drawNextMove, updateSpeed, isGameOver } from "./game";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
let direction = "n";
let speed = 0;
let snake = new Snake([
  [9, 9],
  [8, 9],
  [7, 9],
]);
let apple = new Apple(5, 5);

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight": {
      direction = "e";
      break;
    }
    case "ArrowLeft": {
      direction = "o";
      break;
    }
    case "ArrowUp": {
      direction = "n";
      break;
    }
    case "ArrowDown": {
      direction = "s";
      break;
    }
  }
});

const nextMove = () => {
  snake.generateNewHead(direction);

  if (snake.isHeadOnApple(apple)) {
    apple.generate(snake.body);
    score++;
  } else {
    snake.move();
  }

  if (isGameOver(snake)) {
    alert("Perdu ! Votre score est: " + score);
  } else {
    speed = updateSpeed(score);
    drawNextMove(ctx, snake, apple, score);
    setTimeout(() => {
      requestAnimationFrame(nextMove);
    }, 1000 - speed);
  }
};

requestAnimationFrame(nextMove);
