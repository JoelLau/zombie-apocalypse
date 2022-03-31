import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';
import {
  Board,
  Coordinate,
  Direction,
} from '@zombie-apocalypse/board/interfaces';

@Component({
  selector: 'zombie-apocalypse-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  showOnboarding = true;
  showSettings = false;

  hasExistingBoard = false;

  grid$ = this.board.fetchBoard().pipe(map(({ grid }) => grid));
  gridSize$ = this.board.fetchBoard().pipe(map(({ grid }) => grid.length));

  activeZombieId = 1;
  moveCount = 0;

  log: string[] = [];

  get message() {
    return this.log[this.log.length - 1] || '';
  }

  constructor(private board: BoardDataAccessService) {
    this.resetSimulationMetadata();
  }

  resetSimulationMetadata() {
    this.activeZombieId = this.getZombiesAscId()[0]?.id || 0;
    this.moveCount = 0;
  }

  getCreaturesAscId() {
    return this.board.getCreatures().sort(({ id: a }, { id: b }) => a - b);
  }

  getZombiesAscId() {
    return this.board.getZombies().sort(({ id: a }, { id: b }) => a - b);
  }

  incrementActiveZombieId() {
    console.log(this.getZombiesAscId());
    const zombiesInQueue = this.getZombiesAscId().filter(
      ({ id }) => id > this.activeZombieId
    );
    if (zombiesInQueue.length <= 0) {
      console.log(zombiesInQueue);
      console.log('time to end this');
      return;
    }
    this.activeZombieId = zombiesInQueue[0].id;
  }

  nextButtonClick() {
    this.moveSimulation();
  }

  moveSimulation() {
    console.log('moveSimulation()');
    const zombieId = this.activeZombieId;
    const coords = this.getZombieCoords(zombieId);
    console.log('checking if any creatures are in active spot ...');
    // infect oldest creature on same spot as active zombie
    const creatures = this.board.getCreaturesOnCoordinate(coords);
    if (creatures.length > 0) {
      console.log('    true');
      console.log('    removing oldest creature from spot');
      const oldestCreature = creatures.reduce(
        (prev, curr) => (prev.id < curr.id ? prev : curr),
        creatures[0]
      );
      this.infectCreature(oldestCreature.id, coords);
      return;
    }

    console.log('    false');
    console.log('moving active zombie');
    // move zombie
    const { moveSet } = this.board.getBoard();
    const nextMove = moveSet[this.moveCount] || null;
    console.log('    calculating next move');
    if (!nextMove) {
      console.log('        no more moves');
      this.incrementActiveZombieId();
      this.moveCount = 0;
      return;
    }
    console.log('    next move ' + nextMove);
    console.log('moving active zombie');
    this.moveZombie(zombieId, nextMove);
    this.moveCount++;
  }

  infectCreature(creatureId: number, coords: Coordinate) {
    this.board.removeCreature(creatureId);
    this.board.addZombieToCell(coords);
  }

  moveZombie(zombieId: number, direction: Direction) {
    console.log(`moveZombie(${zombieId}, ${direction})`);
    const coords = this.getZombieCoords(zombieId);
    const board = this.board.getBoard();
    const { grid } = board;

    const destination = coords;
    switch (direction) {
      case Direction.UP:
        destination.y =
          coords.y - 1 < 0 ? grid[coords.x].length - 1 : coords.y - 1;
        break;
      case Direction.DOWN:
        destination.y =
          coords.y - 1 < 0 ? grid[coords.x].length - 1 : coords.y - 1;
        break;
      case Direction.LEFT:
        destination.x =
          coords.x - 1 < 0 ? grid[coords.y].length - 1 : coords.x - 1;
        break;
      case Direction.RIGHT:
        destination.x =
          coords.x + 1 > grid[coords.y].length - 1 ? 0 : coords.x + 1;
        break;
    }

    console.log(`destination: ${JSON.stringify(destination)}`);
    this.board.removeZombie(zombieId);
    this.board.addZombieToCell(coords, zombieId);
  }

  getZombieCoords(zombieId: number) {
    return this.board.getCoordsWithTokenAndId('ZOMBIE', zombieId)[0] || null;
  }

  onOnboardingModalDismiss() {
    this.showOnboarding = false;
    this.showSettings = true;
  }

  onSettingsUpdate(newBoard: Board) {
    this.showSettings = false;
    this.hasExistingBoard = true;

    // update board state
    this.board.setBoard(newBoard);
    const zombies = this.getZombiesAscId();
    const creatures = this.getCreaturesAscId();
    this.board.newZombieId = zombies[zombies.length - 1].id;
    this.board.newCreatureId = creatures[creatures.length - 1].id;
    this.resetSimulationMetadata();
  }

  onSettingsDismiss() {
    this.showSettings = false;
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
