import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodService } from './food.service';
import { SafeMoveService } from './safeMove.service';
import { AttackService } from './attack.service';
import { BorderStrategyService } from './borderStrategy.service';
import { LookAheadService } from './lookAhead.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FoodService, SafeMoveService, BorderStrategyService, AttackService, LookAheadService],
})
export class AppModule {}
