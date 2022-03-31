import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';
import { Board, Coordinate } from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  showOnboarding = true;
  showSettings = false;

  grid$ = this.board.fetchBoard().pipe(map(({ grid }) => grid));

  constructor(private board: BoardDataAccessService) {}

  onOnboardingModalDismiss() {
    this.showOnboarding = false;
    this.showSettings = true;
  }

  onSettingsUpdate(newBoard: Board) {
    console.log(newBoard);
    this.showSettings = false;
    this.board.setBoard(newBoard);
  }

  onTileClick(coords: Coordinate) {
    this.showTileDetails(coords);
  }

  showTileDetails(coords: Coordinate) {
    const tile = this.board.getTokensOnCoordinate(coords);
    console.log(tile);
  }

  openSettings() {
    this.showSettings = true;
  }
}
