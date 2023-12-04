import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Coordinate } from './models/coordinate.model';
import { WeightedMoves, PossibleMove, Direction } from './models/move.model';
import { Snake } from './models/snake.model';

@Injectable()
export class SafeMoveService {
  // eslint-disable-next-line prettier/prettier
  public removeUnsafeMoves(you: Snake,board: Board,weightedMoves: WeightedMoves,log: boolean) {
    const possibleMoves: PossibleMove[] = [];
    possibleMoves.push({
      direction: Direction.RIGHT,
      move: { x: you.head.x + 1, y: you.head.y },
    });
    possibleMoves.push({
      direction: Direction.LEFT,
      move: { x: you.head.x - 1, y: you.head.y },
    });
    possibleMoves.push({
      direction: Direction.UP,
      move: { x: you.head.x, y: you.head.y + 1 },
    });
    possibleMoves.push({
      direction: Direction.DOWN,
      move: { x: you.head.x, y: you.head.y - 1 },
    });

    this.checkBounds(possibleMoves, board, weightedMoves, log);

    const obstacles: Coordinate[] = [];
    obstacles.push(
      ...board.snakes.flatMap((snake) => snake.body),
      ...board.hazards,
    );
    this.checkObstacle(possibleMoves, obstacles, weightedMoves, log);
  }

  // eslint-disable-next-line prettier/prettier
  private checkBounds(possibleMoves: PossibleMove[],board: Board,weightedMoves: WeightedMoves,log: boolean): void {
    possibleMoves.forEach((possibleMove) => {
      if (possibleMove.move.x > board.width - 1) {
        if (log) {
          console.log('edge detected: ', Direction.RIGHT);
        }
        weightedMoves.setWeight(Direction.RIGHT, -100);
      }
      if (possibleMove.move.x < 0) {
        if (log) {
          console.log('edge detected: ', Direction.LEFT);
        }
        weightedMoves.setWeight(Direction.LEFT, -100);
      }

      if (possibleMove.move.y > board.height - 1) {
        if (log) {
          console.log('edge detected: ', Direction.UP);
        }
        weightedMoves.setWeight(Direction.UP, -100);
      }
      if (possibleMove.move.y < 0) {
        if (log) {
          console.log('edge detected: ', Direction.DOWN);
        }
        weightedMoves.setWeight(Direction.DOWN, -100);
      }
    });
  }

  // eslint-disable-next-line prettier/prettier
  private checkObstacle(moves: PossibleMove[],obstacles: Coordinate[],weightedMoves: WeightedMoves,log: boolean): void {
    moves.forEach((possibleMove) => {
      const index = obstacles.findIndex(
        (cord) =>
          cord.x === possibleMove.move.x && cord.y === possibleMove.move.y,
      );
      if (index !== -1) {
        if (log) {
          console.log('obstacle dectected at: ', possibleMove.direction);
        }
        weightedMoves.setWeight(possibleMove.direction, -100);
      }
    });
  }
}
