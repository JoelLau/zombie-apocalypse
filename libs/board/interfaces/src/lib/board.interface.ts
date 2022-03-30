import { Token } from './token.interface';

export interface Board {
  grid: BoardGrid;
}

export type BoardGrid = Token[][][];

export interface Coordinate {
  x: number;
  y: number;
}

export const EMPTY_GRID_2x2: BoardGrid = [
  [[], []],
  [[], []],
];

export const EMPTY_GRID_3X3: BoardGrid = [
  [[], [], []],
  [[], [], []],
  [[], [], []],
];

export const DEFAULT_INIT_GRID: BoardGrid = EMPTY_GRID_2x2;

export const GRID_MIN = 2;

export const GRID_MAX = 99;

export const GRID_DEFAULT = [];

export const EMPTY_GRID_MAX: BoardGrid = new Array(GRID_MAX).fill(
  new Array(GRID_MAX).fill(GRID_DEFAULT)
);

export const DEBOUNCE_TIME = 500;
