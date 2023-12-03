import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Direction, Move, WeightedMoves } from './models/move.model';
import { Turn } from './models/turn.model';

@Injectable()
export class AppService {
  private lastMove: Direction = null;
  getHello(): string {
    return 'Hello World!';
  }

  basicStragey(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();

    return new Move(Direction.UP, 'Matt sucks');
  }

  private findFood(board: Board, you: Snake, range: number): Direction {
    return Direction.UP;
  }

  private dontKillYourSelf(you: Snake, weightedMoves: WeightedMoves): void {
    if(this.lastMove === null){
      return;
    }
    switch(this.lastMove) {
      case Direction.DOWN:
        weightedMoves.setWeight(Direction.UP, -10);
        break;
      case Direction.UP:
        weightedMoves.setWeight(Direction.DOWN, -10);
        break;
      case Direction.LEFT:
        weightedMoves.setWeight(Direction.RIGHT, -10);
        break;
      case Direction.RIGHT:
        weightedMoves.setWeight(Direction.LEFT, -10);
        break;
    }
  }

  private attackOtherSnakes(board: Board, you: Snake): Direction {
    return Direction.UP;
  }
}
