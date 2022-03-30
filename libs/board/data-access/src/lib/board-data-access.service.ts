import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Board,
  Coordinate,
  DEFAULT_INIT_GRID,
  Token,
} from '@zombie-apocalypse/board/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardDataAccessService {
  private board: BehaviorSubject<Board>;
  private board$: Observable<Board>;
  private zombieIid = 0;
  private creatureIid = 0;

  constructor() {
    this.board = new BehaviorSubject<Board>({ grid: DEFAULT_INIT_GRID });
    this.board$ = this.board.asObservable();
  }

  fetchBoard(): Observable<Board> {
    return this.board$;
  }

  getBoard(): Board {
    return this.board.value;
  }

  setBoard(newBoard: Board): void {
    this.board.next(newBoard);
  }

  getTokensOnCoordinate(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    return grid[y][x];
  }

  addZombieToCell(coords: Coordinate) {
    this.addTokenToCell(coords, { type: 'ZOMBIE', id: this.zombieIid++ });
  }

  addCreatureToCell(coords: Coordinate) {
    this.addTokenToCell(coords, { type: 'CREATURE', id: this.creatureIid++ });
  }

  addTokenToCell(coords: Coordinate, token: Token) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    grid[y][x].push(token);
    this.setBoard({ ...board });
  }

  removeZombiesFromCell(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    grid[y][x] = grid[y][x].filter((token) => token.type !== 'ZOMBIE');
    this.setBoard({ ...board, grid });
  }

  removeCreaturesFromCell(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    grid[y][x] = grid[y][x].filter((token) => token.type !== 'CREATURE');
    this.setBoard({ ...board, grid });
  }
}
