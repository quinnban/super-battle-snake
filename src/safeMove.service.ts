import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Coordinate } from './models/coordinate.model';
import { WeightedMoves, PossibleMove, Direction } from './models/move.model';
import { Snake } from './models/snake.model';
import { Utilities } from './utilities';

@Injectable()
export class SafeMoveService {
  public removeUnsafeMoves(you: Snake, board: Board, weightedMoves: WeightedMoves, log: boolean) {
    const possibleMoves: PossibleMove[] = Utilities.getPossibleMoves(you);
    this.checkBounds(possibleMoves, board, weightedMoves, log);

    const obstacles: Coordinate[] = [];
    obstacles.push(...board.snakes.flatMap((snake) => snake.body), ...board.hazards);
    this.checkObstacles(possibleMoves, obstacles, weightedMoves, log);
  }

  private checkBounds(possibleMoves: PossibleMove[],board: Board,weightedMoves: WeightedMoves,log: boolean): void {
    possibleMoves.forEach((possibleMove) => {
      if (possibleMove.move.x > board.width - 1) {
        if (log) {
          console.log('edge detected: ', Direction.RIGHT);
        }
        weightedMoves.setWeight(Direction.RIGHT, -1000);
      }
      if (possibleMove.move.x < 0) {
        if (log) {
          console.log('edge detected: ', Direction.LEFT);
        }
        weightedMoves.setWeight(Direction.LEFT, -1000);
      }

      if (possibleMove.move.y > board.height - 1) {
        if (log) {
          console.log('edge detected: ', Direction.UP);
        }
        weightedMoves.setWeight(Direction.UP, -1000);
      }
      if (possibleMove.move.y < 0) {
        if (log) {
          console.log('edge detected: ', Direction.DOWN);
        }
        weightedMoves.setWeight(Direction.DOWN, -1000);
      }
    });
  }

  private checkObstacles(moves: PossibleMove[],obstacles: Coordinate[],weightedMoves: WeightedMoves,log: boolean): void {
    moves.forEach((possibleMove) => {
      const index = obstacles.findIndex((cord) => cord.x === possibleMove.move.x && cord.y === possibleMove.move.y);
      if (index !== -1) {
        if (log) {
          console.log('obstacle dectected at: ', possibleMove.direction);
        }
        weightedMoves.setWeight(possibleMove.direction, -100);
      }
    });
  }
}
