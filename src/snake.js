import { gridElem } from "./game";

class Snake {
  constructor(body) {
    this.body = body;
  }

  isEatingItSelf() {
    for (let tailElement of this.getTail()) {
      // test si le serpent se mange
      if (tailElement[0] === this.getHead()[0] && tailElement[1] === this.getHead()[1]) {
        return true;
      }
    }
    return false;
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

  getHead() {
    const [head, ...tail] = this.body;
    return head;
  }

  getTail() {
    const [head, ...tail] = this.body;
    return tail;
  }

  isHeadOnApple(apple) {
    const [head, ...tail] = this.body;
    return head[0] === apple.x && head[1] === apple.y;
  }

  generateNewHead(direction) {
    let newSnakeHead = this._calculateNewHead(direction);
    this.body.unshift(newSnakeHead);
  }

  move() {
    this.body.pop();
  }

  isOutside() {
    return (
      this.body[0][0] > 19 ||
      this.body[0][0] < 0 ||
      this.body[0][1] > 19 ||
      this.body[0][1] < 0
    );
  }

  draw(ctx) {
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
}

export { Snake };
