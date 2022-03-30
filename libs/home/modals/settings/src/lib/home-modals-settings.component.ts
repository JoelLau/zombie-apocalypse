import { Component, OnDestroy } from '@angular/core';
import { isEqual } from 'lodash';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { MODE_CREATURE, MODE_ZOMBIE, SettingsForm } from './settings-form';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';
import {
  BoardGrid,
  Coordinate,
  EMPTY_GRID_MAX,
  GRID_MAX,
  GRID_MIN,
} from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-home-modals-settings',
  templateUrl: './home-modals-settings.component.html',
  providers: [BoardDataAccessService],
})
export class HomeModalsSettingsComponent implements OnDestroy {
  gridMin = GRID_MIN;
  gridMax = GRID_MAX;

  settingsForm: SettingsForm = new SettingsForm();
  subscriptions: Subscription = new Subscription();
  grid$: Observable<BoardGrid> = this.board
    .fetchBoard()
    .pipe(map(({ grid }) => grid));

  constructor(private board: BoardDataAccessService) {
    const sizeFormControl = this.settingsForm.formControls.size;
    const sizeChanges = sizeFormControl.valueChanges.pipe(
      distinctUntilChanged()
    );

    const sizeExtraFormControl = this.settingsForm.formControls.sizeExtra;
    const sizeExtraChanges = sizeExtraFormControl.valueChanges.pipe(
      distinctUntilChanged()
    );

    this.subscriptions.add(
      sizeChanges.subscribe((data) => sizeExtraFormControl.setValue(data))
    );
    this.subscriptions.add(
      sizeExtraChanges.subscribe((data) => sizeFormControl.setValue(data))
    );

    this.subscriptions.add(this.bindSizeToBoardGrid());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private bindSizeToBoardGrid() {
    const sizeChanges = this.settingsForm.formControls.size.valueChanges.pipe(
      distinctUntilChanged()
    );

    const boardChanges = this.board
      .fetchBoard()
      .pipe(distinctUntilChanged(isEqual));

    return combineLatest([sizeChanges, boardChanges]).subscribe(
      ([size, board]) => {
        const grid = EMPTY_GRID_MAX.slice(0, size).map(() =>
          EMPTY_GRID_MAX[0].slice(0, size)
        );
        this.board.setBoard({ ...board, ...{ grid } });
      }
    );
  }

  onTileClick(coords: Coordinate) {
    this.updateGameBoard(coords);
  }

  updateGameBoard(coords: Coordinate) {
    const cell = this.board.getTokensOnCoordinate(coords);
    const mode = this.settingsForm.formControls.mode.value;

    const zombies = cell.filter((value) => value.type === 'ZOMBIE');
    const creatures = cell.filter((value) => value.type === 'CREATURE');

    switch (mode) {
      case MODE_ZOMBIE:
        zombies.length > 0
          ? this.board.removeZombiesFromCell(coords)
          : this.board.addZombieToCell(coords);
        break;

      case MODE_CREATURE:
        creatures.length > 0
          ? this.board.removeCreaturesFromCell(coords)
          : this.board.addCreatureToCell(coords);
        break;
    }
  }
}
