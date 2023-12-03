import { Direction, Move, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Turn } from './models/turn.model';
import {Coordinate} from "./models/coordinate.model";

@Injectable()
export class AppService {
  private lastMove: Direction = null;

  basicStragey(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    this.findFood(turn.board,turn.you,100,weightedMoves)
    this.dontKillYourSelf(turn.you,weightedMoves);
    console.log(weightedMoves);
    console.log(weightedMoves.findHighestWeightedMove());
    this.lastMove = weightedMoves.findHighestWeightedMove().move;
    return weightedMoves.findHighestWeightedMove();
  }

  private findFood(board: Board, you: Snake, range: number,weightedMoves : WeightedMoves): void {
    const food = this.findClosestFood(board,you, range);
    const distanceToClosestFoodX = you.head.x - food.x;
    const distanceToClosestFoodY = you.head.y - food.y;
    const xCloserThanY = Math.abs(distanceToClosestFoodX) > Math.abs(distanceToClosestFoodY)
    if(distanceToClosestFoodX > 0){
      weightedMoves.setWeight(Direction.LEFT, 6);
    } else {
      weightedMoves.setWeight(Direction.RIGHT, 6);
    }
    if(distanceToClosestFoodY > 0){
      weightedMoves.setWeight(Direction.DOWN, 6);
    } else {
      weightedMoves.setWeight(Direction.UP, 6);
    }
    if(xCloserThanY){
      weightedMoves.setWeight(Direction.LEFT, 4);
      weightedMoves.setWeight(Direction.RIGHT, 4);
    } else {
      weightedMoves.setWeight(Direction.UP, 4);
      weightedMoves.setWeight(Direction.DOWN, 4);
    }
    
  
  }
  private dontKillYourSelf(you: Snake, weightedMoves: WeightedMoves): void {
    if(this.lastMove === null){
      return;
    }
    switch(this.lastMove) {
      case Direction.DOWN:
        weightedMoves.setWeight(Direction.UP, -100);
        break;
      case Direction.UP:
        weightedMoves.setWeight(Direction.DOWN, -100);
        break;
      case Direction.LEFT:
        weightedMoves.setWeight(Direction.RIGHT, -100);
        break;
      case Direction.RIGHT:
        weightedMoves.setWeight(Direction.LEFT, -100);
        break;
    }
  }

  private attackOtherSnakes(board: Board, you: Snake): Direction {
    return Direction.UP;
  }

  findClosestFood(board: Board, you: Snake, range): Coordinate {
    const allTheFood = board.food;
    let distanceToClosestFood = 999;;
    let closestFood: Coordinate;

    allTheFood.forEach((food) => {
      const deltaX = Math.abs(you.head.x - food.x);
      const deltaY = Math.abs(you.head.y - food.y);

      if (deltaX + deltaY < distanceToClosestFood) {
        distanceToClosestFood = deltaX + deltaY;
        closestFood = food;
      }
    });

    return closestFood;
  }
}
