import { Board } from './board.model';
import { Game } from './game.model';
import { Snake } from './snake.model';

export interface Turn {
  game: Game;
  turn: number;
  board: Board;
  you: Snake;
}
