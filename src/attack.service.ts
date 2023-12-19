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
      console.log('move to attack snake: ', snake.head);
    
    const head = you.head;
    const targetHead = snake.head;
    const dx = head.x - targetHead.x;
    const dy = head.y - targetHead.y;
    const [primaryWeight,secondaryWeigth] = this.calculateWeight(you,snake);
    console.log(`move to attack snake: ${snake.name}, with weight ${primaryWeight} `);
    Utilities.assignWeigthBasedOnDeltas(dx, dy, primaryWeight, secondaryWeigth, weightedMoves);
  }

  private calculateWeight(you: Snake, them: Snake): [number, number] {
    const priWeight = (them.length - you.length) * 20
    const secWeight = (them.length - you.length) * 10
    return [priWeight+ secWeight, secWeight]
  }
}
