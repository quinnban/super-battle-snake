export class Move {
  move: Direction;
  shout: string;
  constructor(m: Direction, s: string) {
    this.move = m;
    this.shout = s;
  }
}

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}
