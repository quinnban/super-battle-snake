import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Coordinate } from './models/coordinate.model';
import { WeightedMoves } from './models/move.model';
import { Snake } from './models/snake.model';
import { Utilities } from './utilities';

@Injectable()
export class FoodService {
  // eslint-disable-next-line prettier/prettier
  public findFood(board: Board,you: Snake,weightedMoves: WeightedMoves,log: boolean,): void {
    const range = this.getFindFoodRange(you);
    const food = this.findClosestFood(board, you, range);
    if (food == null) {
      return;
    }
    if (log) {
      console.log('found food in range: ' + food);
    }
    const distanceToClosestFoodX = you.head.x - food.x;
    const distanceToClosestFoodY = you.head.y - food.y;
   Utilities.assignWeigthBasedOnDeltas(distanceToClosestFoodX,distanceToClosestFoodY,15,10,weightedMoves);
  }

  private findClosestFood(board: Board, you: Snake, range): Coordinate {
    const allTheFood = board.food;
    let distanceToClosestFood = 999;
    let closestFood: Coordinate;

    allTheFood.forEach((food) => {
      const deltaX = Math.abs(you.head.x - food.x);
      const deltaY = Math.abs(you.head.y - food.y);

      if (deltaX + deltaY < distanceToClosestFood) {
        distanceToClosestFood = deltaX + deltaY;
        closestFood = food;
      }
    });

    if (this.isFoodInRange(you, closestFood, range)) {
      return closestFood;
    }
    return null;
  }

  private getFindFoodRange(you: Snake): number {
    const maximumRange = 11;
    const rangeDivider = 3;
    const rangeDeterminant = Math.floor(you.health / rangeDivider);

    if (rangeDeterminant >= 10) {
      return (
        rangeDivider +
        rangeDivider * (rangeDivider - Math.floor(rangeDeterminant / 10))
      );
    }
    return maximumRange;
  }

  // eslint-disable-next-line prettier/prettier
  private isFoodInRange(you: Snake, closestFood: Coordinate, range: number): boolean {
    const deltaX = Math.abs(you.head.x - closestFood.x);
    const deltaY = Math.abs(you.head.y - closestFood.y);

    return deltaX < range || deltaY < range;
  }
}
