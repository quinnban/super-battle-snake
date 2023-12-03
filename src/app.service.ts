import { Direction, Move, PossibleMove, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Board } from './models/board.model';
import { Snake } from './models/snake.model';
import { Turn } from './models/turn.model';
import { Coordinate } from "./models/coordinate.model";

@Injectable()
export class AppService {

  basicStragey(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    this.findFood(turn.board, turn.you, weightedMoves);
    this.moveAroundBorder(turn.board,turn.you,weightedMoves);
    this.removeUnsafeMoves(turn.you,turn.board,weightedMoves);
    if(turn.turn >= 15){
      console.log(weightedMoves);
      console.log(weightedMoves.findHighestWeightedMove());
    }
    return weightedMoves.findHighestWeightedMove();
  }

  private moveAroundBorder(board: Board, you: Snake, weightedMoves: WeightedMoves): void {
    const borderDirection: Direction = this.moveAlongEdge(this.findClosestEdge(you.head,board.height));
    console.log('move along bordering going: ', borderDirection);
    weightedMoves.setWeight(borderDirection,20);
  }

  private findClosestEdge(head: Coordinate, bound: number): Direction {
    const x = head.x - bound;
    const y = head.y - bound;
    const isXCloserThanY = Math.abs(x) < Math.abs(y);
    let edge : Direction;
    if(isXCloserThanY){
      if(x > 0) {
        edge = Direction.RIGHT;
      }
      if (x <= 0) {
        edge = Direction.LEFT;
      }
    } else {
      if(y >= 0) {
        edge = Direction.UP;
      }
      if( y < 0) {
        edge = Direction.DOWN
      }
    }
    console.log('closest edge: ', edge);
    return edge;
  }

  private moveAlongEdge(closestEdge: Direction): Direction {
    switch(closestEdge){
      case Direction.LEFT:
        return Direction.UP;
      case Direction.RIGHT:
        return Direction.DOWN;
      case Direction.UP:
        return Direction.LEFT;
      case Direction.DOWN:
        return Direction.RIGHT;
    }
  }

  private findFood(board: Board, you: Snake,weightedMoves : WeightedMoves): void {
    const range = this.getFindFoodRange(you);
    console.log('range: ' + range);
    const food = this.findClosestFood(board, you, range);
    if (food == null) {
      return;
    }
    const distanceToClosestFoodX = you.head.x - food.x;
    const distanceToClosestFoodY = you.head.y - food.y;
    const xCloserThanY = Math.abs(distanceToClosestFoodX) > Math.abs(distanceToClosestFoodY)
    if (distanceToClosestFoodX > 0){
      weightedMoves.setWeight(Direction.LEFT, 8);
    } else {
      weightedMoves.setWeight(Direction.RIGHT, 8);
    }
    if (distanceToClosestFoodY > 0){
      weightedMoves.setWeight(Direction.DOWN, 8);
    } else {
      weightedMoves.setWeight(Direction.UP, 8);
    }
    if (xCloserThanY){
      weightedMoves.setWeight(Direction.LEFT, 15);
      weightedMoves.setWeight(Direction.RIGHT,15);
    } else {
      weightedMoves.setWeight(Direction.UP, 15);
      weightedMoves.setWeight(Direction.DOWN, 15);
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

  getFindFoodRange(you: Snake): number {
    const maximumRange = 11;
    const rangeDivider = 3;
    const rangeDeterminant = Math.floor(you.health / rangeDivider);

    if (rangeDeterminant >= 10) {
      return rangeDivider + (rangeDivider * (rangeDivider - Math.floor(rangeDeterminant / 10)));
    }
    return maximumRange;
  }

  isFoodInRange(you: Snake, closestFood: Coordinate, range: number): boolean {
    const deltaX = Math.abs(you.head.x - closestFood.x);
    const deltaY = Math.abs(you.head.y - closestFood.y);

    return deltaX < range || deltaY < range;
  }
}
