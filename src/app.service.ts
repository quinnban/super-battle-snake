import { Move, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Turn } from './models/turn.model';
import { FoodService } from './food.service';
import { SafeMoveService } from './safeMove.service';
import { BorderStrategyService } from './borderstrategy.service';

@Injectable()
export class AppService {
  constructor(
    private foodService: FoodService,
    private safeMoveService: SafeMoveService,
    private borderStrategyService: BorderStrategyService,
  ) {}

  basicStrategy(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    const log = turn.turn <= 10;
    if (turn.you.health < 75) {
      this.foodService.findFood(turn.board, turn.you, weightedMoves, log);
    } else {
      // eslint-disable-next-line prettier/prettier
      this.borderStrategyService.moveAroundBorder(turn.board, turn.you, weightedMoves, log);
    }

    // eslint-disable-next-line prettier/prettier
    this.safeMoveService.removeUnsafeMoves(turn.you, turn.board, weightedMoves, log);
    if (log) {
      console.log(weightedMoves);
      console.log(weightedMoves.findHighestWeightedMove());
    }
    return weightedMoves.findHighestWeightedMove();
  }
}
