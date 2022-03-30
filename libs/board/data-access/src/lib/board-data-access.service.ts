import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board, DEFAULT_INIT_GRID } from '@zombie-apocalypse/board/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardDataAccessService {
  private board: BehaviorSubject<Board>;
  private board$: Observable<Board>;

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
}
