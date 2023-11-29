import { Coordinate } from './coordinate.model';
import { Snake } from './snake.model';

export interface Board {
  height: number;
  width: number;
  food: Coordinate[];
  hazards: Coordinate[];
  snakes: Snake[];
}
