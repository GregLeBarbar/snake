const gridElem = 40; // 20 * 20

const drawMap = (ctx) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);
};

const drawScore = (ctx, score) => {
  ctx.fillStyle = "white";
  ctx.font = "40px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
};

const drawNextMove = (ctx, snake, apple, score) => {
  drawMap(ctx);
  snake.draw(ctx);
  apple.draw(ctx);
  drawScore(ctx, score);
};

const updateSpeed = (score) => {
  return score * 50;
};

const isGameOver = (snake) => {
  if (snake.isOutside()) {
    return true;
  } else {
    return snake.isEatingItSelf();
  }
};

export { gridElem, drawNextMove, updateSpeed, isGameOver };
