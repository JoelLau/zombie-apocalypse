import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BoardGrid,
  Coordinate,
  Token,
} from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-board-ui',
  templateUrl: './board-ui.component.html',
})
export class BoardUiComponent {
  @Input() grid?: BoardGrid | null = [];
  @Output() tileClicked: EventEmitter<Coordinate> =
    new EventEmitter<Coordinate>();

  get gridTemplateColumns() {
    return `repeat(${(this.grid || []).length}, 1fr)`;
  }

  onTileClick(columnIndex: number, rowIndex: number): void {
    this.tileClicked.emit({
      x: columnIndex,
      y: rowIndex,
    });
  }

  hasZombie(cell: Token[]) {
    return cell.some(({ type }) => type === 'ZOMBIE');
  }

  hasCreature(cell: Token[]) {
    return cell.some(({ type }) => type === 'CREATURE');
  }
}
