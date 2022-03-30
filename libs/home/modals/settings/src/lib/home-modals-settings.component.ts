import { Component, OnDestroy } from '@angular/core';
import { isEqual } from 'lodash';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { SettingsForm } from './settings-form';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';
import {
  BoardGrid,
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
    this.subscriptions.add(this.bindSizeToBoardGrid());
    this.subscriptions.add(this.bindSizeControls());
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

  private bindSizeControls(): void {
    const sizeFormControl = this.settingsForm.formControls.size;
    const sizeExtraFormControl = this.settingsForm.formControls.sizeExtra;

    sizeFormControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((data) => sizeExtraFormControl.setValue(data));

    sizeExtraFormControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((data) => sizeFormControl.setValue(data));
  }
}
