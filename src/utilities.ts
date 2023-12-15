import { Board } from './models/board.model';
import { Direction, PossibleMove, WeightedMoves } from './models/move.model';
import { Snake } from './models/snake.model';

export class Utilities {
  
  public static  assignWeigthBasedOnDeltas(dx: number, dy: number,primaryWeight: number, secondaryWeigth: number, weightedMoves: WeightedMoves): void {
    if (Math.abs(dx) <= Math.abs(dy)) {
      if (dx === 0 && dy > 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight + secondaryWeigth);
      } else if (dx === 0 && dy < 0) {
        weightedMoves.setWeight(Direction.UP, primaryWeight + secondaryWeigth);
      } else if (dx > 0 && dy > 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight);
        weightedMoves.setWeight(Direction.DOWN, secondaryWeigth);
      } else if (dx > 0 && dy < 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight);
        weightedMoves.setWeight(Direction.UP, secondaryWeigth);
      } else if (dx < 0 && dy < 0) {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight);
        weightedMoves.setWeight(Direction.UP, secondaryWeigth);
      } else {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight);
        weightedMoves.setWeight(Direction.DOWN, secondaryWeigth);
      }
    }

    if (Math.abs(dy) < Math.abs(dx)) {
      if (dy === 0 && dx < 0) {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight + secondaryWeigth);
      } else if (dy === 0 && dx > 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight + secondaryWeigth);
      } else if (dy > 0 && dx > 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight);
        weightedMoves.setWeight(Direction.LEFT, secondaryWeigth);
      } else if (dy > 0 && dx < 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight);
        weightedMoves.setWeight(Direction.RIGHT, secondaryWeigth);
      } else if (dy < 0 && dx < 0) {
        weightedMoves.setWeight(Direction.UP, primaryWeight);
        weightedMoves.setWeight(Direction.RIGHT, secondaryWeigth);
      } else {
        weightedMoves.setWeight(Direction.UP, primaryWeight);
        weightedMoves.setWeight(Direction.LEFT, secondaryWeigth);
      }
    }
  }

  public static findClosestSnake(you: Snake, board: Board, killable: boolean): Snake {
    console.log(JSON.stringify(board.snakes));
    const head = you.head;
    const snakes = board.snakes.filter(snake  => snake.name !== you.name);

    let closestDistance = 10000;
    let closestSnake: Snake;
    for(const snake of snakes) {
      if (snake.length >= you.length && killable) {
        return;
      }
      const distance = Math.abs(head.x - snake.head.x) + Math.abs(head.y - snake.head.y);
      if (closestDistance > distance) {
        closestDistance = distance;
        closestSnake = snake;
      }
    }
    return closestSnake;
  }

  public static getPossibleMoves(snake: Snake): PossibleMove[] {
    const possibleMoves: PossibleMove[] = [];
    possibleMoves.push({
      direction: Direction.RIGHT,
      move: { x: snake.head.x + 1, y: snake.head.y },
    });
    possibleMoves.push({
      direction: Direction.LEFT,
      move: { x: snake.head.x - 1, y: snake.head.y },
    });
    possibleMoves.push({
      direction: Direction.UP,
      move: { x: snake.head.x, y: snake.head.y + 1 },
    });
    possibleMoves.push({
      direction: Direction.DOWN,
      move: { x: snake.head.x, y: snake.head.y - 1 },
    });
    return possibleMoves;
  }
}
