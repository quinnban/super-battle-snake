import { Coordinate } from './coordinate.model';

export interface Snake {
  id: string;
  name: string;
  health: number;
  body: Coordinate[];
  latency: number;
  head: Coordinate;
  length: number;
  shout: string;
  squad: number;
  customizations: Customizations;
}

interface Customizations {
  color: string;
  head: string;
  tail: string;
}
