import { Token } from './token.interface';

export interface Board {
  grid: BoardGrid;
}

export type BoardGrid = Token[][][];

export interface Coordinate {
  x: number;
  y: number;
}
