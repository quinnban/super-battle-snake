import { Injectable } from '@nestjs/common';
import { Snake } from './models/snake.model';
import { Board } from './models/board.model';
import { WeightedMoves } from './models/move.model';
import { WeighingUtility } from './weighingUtility';

@Injectable()
export class AttackService {
  // eslint-disable-next-line prettier/prettier
  public attackOtherSnakes(you: Snake,board: Board, weightedMoves: WeightedMoves, log: boolean) {
    const snake = this.findClosestKillableSnake(you, board, log);
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
    WeighingUtility.assignWeigthBasedOnDeltas(dx, dy, 20, 15, weightedMoves);
  }

  private findClosestKillableSnake(you: Snake, board: Board, log: boolean): Snake {
    const head = you.head;
    const snakes = board.snakes.slice(1);
    let closestDistance = 10000;
    let suckerSnake: Snake;
    snakes.forEach((snake) => {
      if (snake.length >= board.snakes[0].length) {
        return;
      }
      const distance = Math.abs(head.x - snake.head.x) + Math.abs(head.y - snake.head.y);
      if (closestDistance > distance) {
        closestDistance = distance;
        suckerSnake = snake;
      }
    });
    return suckerSnake;
  }
}
