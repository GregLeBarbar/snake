import "./style.css";

const gridElem = 40; // 20 * 20

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setApple(x, y) {
    this.x = x;
    this.y = y;
  }

  drawApple(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * gridElem, this.y * gridElem, gridElem, gridElem);
  }

  generateApple(snake) {
    score++;
    const [x, y] = [
      Math.trunc(Math.random() * 19),
      Math.trunc(Math.random() * 19),
    ];
    for (let body of snake) {
      if (body[0] === x && body[1] === y) {
        return this.generateApple(snake);
      }
    }
    this.setApple(x, y);
  }
}

class Snake {
  constructor(body) {
    this.body = body;
  }

  getHead() {
    const [head, ...body] = this.body;
    return head;
  }

  getTail() {
    const [head, ...tail] = this.body;
    return tail;
  }

  isOutside() {
    return (
      this.body[0][0] > 19 ||
      this.body[0][0] < 0 ||
      this.body[0][1] > 19 ||
      this.body[0][1] < 0
    );
  }

  drawSnake(ctx) {
    ctx.fillStyle = "green";
    for (let element of this.body) {
      ctx.fillRect(
        element[0] * gridElem,
        element[1] * gridElem,
        gridElem,
        gridElem
      );
    }
  }

  _calculateNewHead(direction) {
    let head;
    switch (direction) {
      // est
      case "e": {
        head = [this.body[0][0] + 1, this.body[0][1]];
        break;
      }
      // ouest
      case "o": {
        head = [this.body[0][0] - 1, this.body[0][1]];
        break;
      }
      // nord
      case "n": {
        head = [this.body[0][0], this.body[0][1] - 1];
        break;
      }
      // sud
      case "s": {
        head = [this.body[0][0], this.body[0][1] + 1];
        break;
      }
    }
    return head;
  }

  updateSnakePosition(direction, apple) {
    let head = this._calculateNewHead(direction);
    console.log("head: ", head);
    //debugger;
    console.log("body: ", this.body);
    // unshift ajoute au début du tableau
    this.body.unshift(head);

    if (head[0] === apple.x && head[1] === apple.y) {
      apple.generateApple(this.body);
    } else {
      // supprime le dernier élément
      this.body.pop();
    }
    
  }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let direction = "n";
let speed = 0;

const snake = new Snake([
  [9, 9],
  [8, 9],
  [7, 9],
]);
let apple = new Apple(5, 5);
let score = 0;

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);
};

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
  console.log(event);
  console.log(direction);
});

const gameover = () => {
  if (snake.isOutside()) {
    return true;
  } else {
    let head = snake.getHead();
    let tail = snake.getTail();
    for (let tailElement of tail) {
      // Test si la tête et un élément du body sont sur la même case de la grille
      if (tailElement[0] === head[0] && tailElement[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
};

const drawScore = () => {
  ctx.fillStyle = "white";
  ctx.font = "40px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
};

const move = () => {
  snake.updateSnakePosition(direction, apple)
  let isGameOver = gameover();
  if (isGameOver) {
    alert("Perdu ! Votre score est: " + score);
  } else {
    speed = score * 50;
    drawMap();
    snake.drawSnake(ctx);
    apple.drawApple(ctx);
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - speed);
  }
};

requestAnimationFrame(move);
