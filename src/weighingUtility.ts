import { Direction, WeightedMoves } from './models/move.model';

export class WeighingUtility {
  // eslint-disable-next-line prettier/prettier
  public static  assignWeigthBasedOnDeltas(dx: number, dy: number,primaryWeight: number, secondaryWeigth: number, weightedMoves: WeightedMoves): void {
    if (Math.abs(dx) <= Math.abs(dy)) {
      if (dx === 0 && dy > 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight + secondaryWeigth);
      } else if (dx === 0 && dy < 0) {
        weightedMoves.setWeight(Direction.UP, primaryWeight + secondaryWeigth);
      } else if (dx > 0 && dy > 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight);
        weightedMoves.setWeight(Direction.DOWN, secondaryWeigth);
      } else if (dx > 0 && dy < 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight);
        weightedMoves.setWeight(Direction.UP, secondaryWeigth);
      } else if (dx < 0 && dy < 0) {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight);
        weightedMoves.setWeight(Direction.UP, secondaryWeigth);
      } else {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight);
        weightedMoves.setWeight(Direction.DOWN, secondaryWeigth);
      }
    }

    if (Math.abs(dy) < Math.abs(dx)) {
      if (dy === 0 && dx < 0) {
        weightedMoves.setWeight(Direction.RIGHT, primaryWeight + secondaryWeigth);
      } else if (dy === 0 && dx > 0) {
        weightedMoves.setWeight(Direction.LEFT, primaryWeight + secondaryWeigth);
      } else if (dy > 0 && dx > 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight);
        weightedMoves.setWeight(Direction.LEFT, secondaryWeigth);
      } else if (dy > 0 && dx < 0) {
        weightedMoves.setWeight(Direction.DOWN, primaryWeight);
        weightedMoves.setWeight(Direction.RIGHT, secondaryWeigth);
      } else if (dy < 0 && dx < 0) {
        weightedMoves.setWeight(Direction.UP, primaryWeight);
        weightedMoves.setWeight(Direction.RIGHT, secondaryWeigth);
      } else {
        weightedMoves.setWeight(Direction.UP, primaryWeight);
        weightedMoves.setWeight(Direction.LEFT, secondaryWeigth);
      }
    }
  }
}
