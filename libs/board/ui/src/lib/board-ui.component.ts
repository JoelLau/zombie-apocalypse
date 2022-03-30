import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardGrid, Coordinate } from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-board-ui',
  templateUrl: './board-ui.component.html',
})
export class BoardUiComponent {
  @Input() grid?: BoardGrid | null = [];
  @Output() tileClicked: EventEmitter<Coordinate> =
    new EventEmitter<Coordinate>();

  onTileClick(columnIndex: number, rowIndex: number): void {
    this.tileClicked.emit({
      x: columnIndex,
      y: rowIndex,
    });
  }
}
