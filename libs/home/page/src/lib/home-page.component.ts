import { Component } from '@angular/core';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';
import { Board } from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  showOnboarding = true;
  showSettings = false;

  constructor(private board: BoardDataAccessService) {}

  onOnboardingModalDismiss() {
    this.showOnboarding = false;
    this.showSettings = true;
  }

  onSettingsUpdate(newBoard: Board) {
    this.showSettings = false;
    this.board.setBoard(newBoard);
  }
}
