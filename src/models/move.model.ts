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

export class WeightedMoves {
  moves: WeightedMove[];

  constructor() {
    this.moves = [];
    this.moves.push(new WeightedMove(Direction.UP, 0));
    this.moves.push(new WeightedMove(Direction.DOWN, 0));
    this.moves.push(new WeightedMove(Direction.LEFT, 0));
    this.moves.push(new WeightedMove(Direction.RIGHT, 0));
  }

  setWeight(direction: Direction, weight: number): void {
    const index = this.moves.findIndex((move) => move.direction === direction);
    this.moves[index].weight += weight;
  }

  findHighestWeightedMove(): Move {
    const temp = this.moves.map((move) => move.weight);
    const maxValue = Math.max(...temp);
    const index = temp.findIndex((number) => number === maxValue);
    return new Move(this.moves[index].direction, '');
  }
}

class WeightedMove {
  direction: Direction;
  weight: number;
  constructor(d: Direction, w: number) {
    this.direction = d;
    this.weight = w;
  }
}
