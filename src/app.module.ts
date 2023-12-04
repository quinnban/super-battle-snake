import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodService } from './food.service';
import { SafeMoveService } from './safeMove.service';
import { BorderStrategyService } from './borderstrategy.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FoodService, SafeMoveService, BorderStrategyService],
})
export class AppModule {}
