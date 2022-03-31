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

  hasExistingBoard = false;

  grid$ = this.board.fetchBoard().pipe(map(({ grid }) => grid));
  gridSize$ = this.board.fetchBoard().pipe(map(({ grid }) => grid.length));

  activeZombieId = 0;
  moveCount = 0;

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
    this.activeZombieId =
      this.getZombiesAscId().filter(({ id }) => id > this.activeZombieId)[0]
        ?.id || this.activeZombieId;
  }

  nextButtonClick() {
    this.moveSimulation();
  }

  moveSimulation() {
    // 1. GET ACTIVE ZOMBIE COORDS
    // 2. CHECK IF CREATURES ON COORDS
    //    a. IF TRUE
    //        i. INFECT OLDEST CREATURE ON COORDS
    //    b. IF FALSE
    //        i. CONTINUE TO STEP 3
    // 3. GET NEXT DIRECTION
    //    a. IF TRUTHY
    //        i. REMOVE ZOMBIE ON CURRENT COORDS
    //       ii. PLACE ZOMBIE ON NEW COORDS

    const coords = this.getActiveZombieCoords();
    console.log(coords);
    // infect oldest creature on same spot as active zombie
    const creatures = this.board.getCreaturesOnCoordinate(coords);
    if (creatures.length > 0) {
      const oldestCreature = creatures.reduce(
        (prev, curr) => (prev.id < curr.id ? prev : curr),
        creatures[0]
      );
      this.infectCreature(oldestCreature.id, coords);
      return;
    }

    // move zombie
    const { moveSet } = this.board.getBoard();
    const nextMove = moveSet[(this.moveCount + 1) % moveSet.length];
    console.log(nextMove);
  }

  infectCreature(creatureId: number, coords: Coordinate) {
    this.board.removeCreature(creatureId);
    this.board.addZombieToCell(coords);
  }

  getActiveZombieCoords() {
    return (
      this.board.getCoordsWithTokenAndId('ZOMBIE', this.activeZombieId)[0] ||
      null
    );
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
