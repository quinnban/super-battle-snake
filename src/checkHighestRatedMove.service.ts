import { Injectable } from '@nestjs/common';
import { Snake } from './models/snake.model';
import { Board } from './models/board.model';
import { Utilities } from 'src/utilities';
import { PossibleMove, WeightedMoves } from './models/move.model';
import { Coordinate } from './models/coordinate.model';

@Injectable()
export class DoubleLookAheadService {
  public lookAhead(you: Snake, board: Board, log: boolean, weightedMoves: WeightedMoves): void {
    const closestSnake = Utilities.findClosestSnake(you, board, false);
    const bestMove = weightedMoves.findHighestWeightedMove();

  }
}
