import { Injectable } from '@nestjs/common';
import { Snake } from './models/snake.model';
import { Board } from './models/board.model';
import { WeightedMoves } from './models/move.model';
import { Utilities } from './utilities';


@Injectable()
export class AttackService {
  
  public attackOtherSnakes(you: Snake,board: Board, weightedMoves: WeightedMoves, log: boolean) {
    const snake = Utilities.findClosestSnake(you, board, true);
    if (!snake) {
      return;
    }
    if (log) {
      console.log('move to attack snake: ', snake.head);
    }
    const head = you.head;
    const targetHead = snake.head;
    const dx = head.x - targetHead.x;
    const dy = head.y - targetHead.y;
    Utilities.assignWeigthBasedOnDeltas(dx, dy, 20, 10, weightedMoves);
  }
}
