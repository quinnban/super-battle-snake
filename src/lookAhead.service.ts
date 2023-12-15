import { Injectable } from '@nestjs/common';
import { Snake } from './models/snake.model';
import { Board } from './models/board.model';
import { Utilities } from 'src/utilities';
import { PossibleMove, WeightedMoves } from './models/move.model';
import { Coordinate } from './models/coordinate.model';

@Injectable()
export class LookAheadService {
  public lookAhead(you: Snake, board: Board, log: boolean, weightedMoves: WeightedMoves): void {
    const closestSnake = Utilities.findClosestSnake(you, board, false);
    if (!closestSnake) {
      return;
    }
    this.dontRunintoSnakeBiggerThanUs(you, closestSnake, weightedMoves, log);
  }

  private dontRunintoSnakeBiggerThanUs(you: Snake, them: Snake, weightedMoves: WeightedMoves, log: boolean): void {
    if (you.length > them.length) {
      return;
    }
    const ourMoves: PossibleMove[] = Utilities.getPossibleMoves(you);
    const thereMoves: Coordinate[] = Utilities.getPossibleMoves(them).flatMap((m) => m.move);
    ourMoves.forEach((move) => {
      const index = thereMoves.findIndex((o) => o.x === move.move.x && o.y === move.move.y);
      if (index !== -1) {
        if(log){console.log(`going to run into a snake, our move: ${JSON.stringify(move.move)}`) }
        weightedMoves.setWeight(move.direction, -100);
      }
    });
  }
}
