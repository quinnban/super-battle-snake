import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Coordinate } from './models/coordinate.model';
import { WeightedMoves, Direction } from './models/move.model';
import { Snake } from './models/snake.model';

@Injectable()
export class BorderStrategyService {
  public moveAroundBorder(board: Board,you: Snake,weightedMoves: WeightedMoves,log: boolean): void {
    const closestEdge = this.findClosestEdge(you.head, board.height - 1, log);
    if (!this.areWeOnEdge(you.head, board.height - 1)) {
      if (log) {
        console.log('move towards edge: ', closestEdge);
      }
      weightedMoves.setWeight(closestEdge, 14);
    } else {
      const borderDirection: Direction = this.moveAlongEdge(closestEdge);
      if (log) {
        console.log('move along bordering going: ', borderDirection);
      }
      weightedMoves.setWeight(borderDirection, 14);
    }
  }

  private areWeOnEdge(head: Coordinate, bound: number): boolean {
    if (head.x === 0 || head.x === bound || head.y === 0 || head.y === bound) {
      return true;
    }
    return false;
  }

  private findClosestEdge(head: Coordinate,bound: number,log: boolean): Direction {
    const temp = new WeightedMoves();
    const xRight = bound - head.x;
    const yUp = bound - head.y;
    const xLeft = head.x;
    const yDown = head.y;

    temp.setWeight(Direction.LEFT, xLeft);
    temp.setWeight(Direction.RIGHT, xRight);
    temp.setWeight(Direction.UP, yUp);
    temp.setWeight(Direction.DOWN, yDown);

    const edge: Direction = temp.findLowestWeigtheMove().move;

    if (log) {
      console.log('closest edge: ', edge);
    }
    return edge;
  }

  private moveAlongEdge(closestEdge: Direction): Direction {
    switch (closestEdge) {
      case Direction.LEFT:
        return Direction.UP;
      case Direction.RIGHT:
        return Direction.DOWN;
      case Direction.UP:
        return Direction.RIGHT;
      case Direction.DOWN:
        return Direction.LEFT;
    }
  }
}
