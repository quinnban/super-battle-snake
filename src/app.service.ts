import { Move, WeightedMoves } from './models/move.model';
import { Injectable } from '@nestjs/common';
import { Turn } from './models/turn.model';
import { FoodService } from './food.service';
import { SafeMoveService } from './safeMove.service';
import { BorderStrategyService } from './borderStrategy.service';
import { AttackService } from './attack.service';
import { LookAheadService } from './lookAhead.service';

@Injectable()
export class AppService {
  constructor(private foodService: FoodService, private safeMoveService: SafeMoveService, private borderStrategyService: BorderStrategyService, private attackService: AttackService, private lookAheadService: LookAheadService) {}

  basicStrategy(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    const log = turn.turn <= 10;
    if (turn.you.health < 75) {
      this.foodService.findFood(turn.board, turn.you, weightedMoves, log);
    } else {
      this.borderStrategyService.moveAroundBorder(turn.board, turn.you, weightedMoves, log);
    }

    this.safeMoveService.removeUnsafeMoves(turn.you, turn.board, weightedMoves, log);
    if (log) {
      console.log(weightedMoves);
      console.log(weightedMoves.findHighestWeightedMove());
    }
    return weightedMoves.findHighestWeightedMove();
  }

  attackStrategy(turn: Turn): Move {
    const weightedMoves = new WeightedMoves();
    const log = turn.turn <= 10;
    this.foodService.findFood(turn.board, turn.you, weightedMoves, log);
    this.attackService.attackOtherSnakes(turn.you, turn.board, weightedMoves, log);
    this.lookAheadService.lookAhead(turn.you, turn.board, log, weightedMoves);
    this.safeMoveService.removeUnsafeMoves(turn.you, turn.board, weightedMoves, log);
    if (log) {
      console.log(weightedMoves);
      console.log(weightedMoves.findHighestWeightedMove());
    }
    return weightedMoves.findHighestWeightedMove();
  }
}
