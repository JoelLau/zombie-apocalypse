import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '@zombie-apocalypse/board/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardDataAccessService {
  private board: BehaviorSubject<Board>;
  private board$: Observable<Board>;

  constructor() {
    this.board = new BehaviorSubject<Board>({ grid: [] });
    this.board$ = this.board.asObservable();
  }

  fetchBoard(): Observable<Board> {
    return this.board$;
  }

  setBoard(newBoard: Board): void {
    this.board.next(newBoard);
  }
}
