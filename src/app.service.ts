import { Direction, Move, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Turn } from './models/turn.model';
import {Injectable} from '@nestjs/common';
import {Direction, Move} from './models/move.model';
import {Coordinate} from "./models/coordinate.model";

@Injectable()
export class AppService {
  private lastMove: Direction = null;
  getHello(): string {
    return 'Hello World!';
  }

  basicStragey(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();

    this.dontKillYourSelf(turn.you,weightedMoves);
    return weightedMoves.findHighestWeightedMove();
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

  findClosestFood(board: Board, you: Snake): Direction {
    let allTheFood: Coordinate[];
    let distanceToClosestFood: number;
    let closestFood: Coordinate;

    allTheFood = board.food;
    distanceToClosestFood = 999;

    allTheFood.forEach(function (food) {
      const deltaX = Math.abs(you.head.x - food.x);
      const deltaY = Math.abs(you.head.y - food.y);

      if (deltaX + deltaY < distanceToClosestFood) {
        distanceToClosestFood = deltaX + deltaY;
        closestFood = food;
      }
    });

    let distanceToClosestFoodX = you.head.x - closestFood.x;
    let distanceToClosestFoodY = you.head.y - closestFood.y;

    if (Math.abs(distanceToClosestFoodX) > Math.abs(distanceToClosestFoodY)) {
      return distanceToClosestFoodX > 0 ? Direction.LEFT : Direction.RIGHT;
    } else {
      return distanceToClosestFoodY > 0 ? Direction.UP : Direction.DOWN;
    }
  }
}
