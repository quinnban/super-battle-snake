import { Direction, Move, PossibleMove, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Turn } from './models/turn.model';
import {Coordinate} from "./models/coordinate.model";

@Injectable()
export class AppService {

  basicStragey(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    this.findFood(turn.board,turn.you,100,weightedMoves)
    this.removeUnsafeMoves(turn.you,turn.board,weightedMoves);
    console.log(weightedMoves);
    console.log(weightedMoves.findHighestWeightedMove());
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

private removeUnsafeMoves(you: Snake,board: Board, weightedMoves: WeightedMoves){
  const possibleMoves : PossibleMove [] = [];
  possibleMoves.push({direction: Direction.RIGHT,move: {x: you.head.x + 1, y: you.head.y}});
  possibleMoves.push({direction: Direction.LEFT, move: {x: you.head.x - 1, y: you.head.y}});
  possibleMoves.push({direction: Direction.UP, move: {x: you.head.x, y: you.head.y + 1}});
  possibleMoves.push({direction: Direction.DOWN, move: {x: you.head.x, y: you.head.y - 1}});

  this.checkBounds(possibleMoves,board,weightedMoves);

  const obstacles: Coordinate [] = [];
  obstacles.push(...board.snakes.flatMap(snake => snake.body),...board.hazards);
  this.checkObstacle(possibleMoves,obstacles,weightedMoves);

}

private checkBounds(possibleMoves : PossibleMove [],board: Board,weightedMoves: WeightedMoves): void {
  possibleMoves.forEach(possibleMove => { 
    if(possibleMove.move.x > board.width -1 ){
      weightedMoves.setWeight(Direction.RIGHT , -100)
    }
    if(possibleMove.move.x < 0){
      weightedMoves.setWeight(Direction.LEFT , -100)
    }

    if(possibleMove.move.x > board.height -1 ){
      weightedMoves.setWeight(Direction.UP , -100)
    }
    if(possibleMove.move.y < 0){
      weightedMoves.setWeight(Direction.DOWN , -100)
    }
  });
}

private checkObstacle(moves : PossibleMove [], obstacles: Coordinate [], weightedMoves: WeightedMoves): void{
  moves.forEach(possibleMove => {
    const index = obstacles.findIndex(cord => cord.x === possibleMove.move.x && cord.y === possibleMove.move.y);
    if(index !== -1){
      weightedMoves.setWeight(possibleMove.direction,-100);
    };
  })
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
