

import { gridElem } from "./game";

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x * gridElem,
      this.y * gridElem,
      gridElem,
      gridElem
    );
  }

  generate(snake) {
    const [x, y] = [
      Math.trunc(Math.random() * 19),
      Math.trunc(Math.random() * 19),
    ];
    for (let body of snake) {
      if (body[0] === x && body[1] === y) {
        return this.generate(snake);
      }
    }
    this.set(x, y);
  }
}

export { Apple };
