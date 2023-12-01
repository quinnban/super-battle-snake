import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Direction, Move } from './models/move.model';
import { Turn } from './models/turn.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  basicStragey(turn: Turn): Move {
    return new Move(Direction.UP, 'Matt sucks');
  }

  findFood(board: Board, you: Snake): Direction {
    return Direction.UP;
  }

  dontKillYourSelf(board: Board, you: Snake): Direction {
    return Direction.UP;
  }

  attackOtherSnakes(board: Board, you: Snake): Direction {
    return Direction.UP;
  }
}
