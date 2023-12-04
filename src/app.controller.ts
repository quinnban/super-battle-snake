import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InitalInfo } from './models/initalInfo.model';
import { Turn } from './models/turn.model';
import { Move } from './models/move.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): InitalInfo {
    return new InitalInfo();
  }

  @Post('/start')
  @HttpCode(200)
  startGame(@Body() turn: Turn): void {
    console.log(turn);
  }

  @Post('move')
  @HttpCode(200)
  moveSnake(@Body() turn: Turn): Move {
    return this.appService.basicStrategy(turn);
  }

  @Post('end')
  @HttpCode(200)
  endGame(@Body() turn: Turn): void {
    console.log(turn);
  }
}
