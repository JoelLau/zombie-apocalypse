import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import {
  Board,
  Coordinate,
  DEFAULT_INIT_BOARD,
  Token,
} from '@zombie-apocalypse/board/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardDataAccessService {
  private board: BehaviorSubject<Board>;
  private board$: Observable<Board>;
  private zombieId = 0;
  private creatureIid = 0;

  constructor() {
    this.board = new BehaviorSubject<Board>(DEFAULT_INIT_BOARD);
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

  fetchZombies() {
    return this.fetchTokensOfType('ZOMBIE');
  }

  fetchCreatures() {
    return this.fetchTokensOfType('CREATURE');
  }

  fetchTokensOfType(tokenType: 'ZOMBIE' | 'CREATURE') {
    return this.fetchBoard().pipe(
      distinctUntilChanged(),
      map(({ grid }) =>
        grid.reduce(
          (allZombies, row) => [
            ...allZombies,
            ...row.reduce(
              (zombiesOnRow, cell) => [
                ...zombiesOnRow,
                ...cell.filter(({ type }) => type === tokenType),
              ],
              []
            ),
          ],
          [] as Token[]
        )
      )
    );
  }

  getTokensOnCoordinate(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    return grid[y][x];
  }

  addZombieToCell(coords: Coordinate) {
    this.addTokenToCell(coords, { type: 'ZOMBIE', id: this.zombieId++ });
  }

  addCreatureToCell(coords: Coordinate) {
    this.addTokenToCell(coords, { type: 'CREATURE', id: this.creatureIid++ });
  }

  addTokenToCell(coords: Coordinate, token: Token) {
    const board = this.getBoard();
    const { grid } = JSON.parse(JSON.stringify(board));
    const { x, y } = coords;

    grid[y][x].push(token);
    this.setBoard({ ...board, grid });
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
