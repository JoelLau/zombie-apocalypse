import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DEFAULT_INIT_GRID,
  GRID_MAX,
  GRID_MIN,
} from '@zombie-apocalypse/board/interfaces';

export class SettingsForm extends FormGroup {
  get formControls() {
    return {
      size: this.controls['size'] as FormControl,
      sizeExtra: this.controls['sizeExtra'] as FormControl,
      zombies: this.controls['zombies'] as FormControl,
      creatures: this.controls['creatures'] as FormControl,
    };
  }

  constructor() {
    super(settingsFormInitControls);
  }
}

export const settingsFormInitControls = {
  size: new FormControl(DEFAULT_INIT_GRID.length, [
    Validators.required,
    Validators.min(GRID_MIN),
    Validators.max(GRID_MAX),
  ]),
  // extra control, will not be sent
  sizeExtra: new FormControl(2, [
    Validators.required,
    Validators.min(GRID_MIN),
    Validators.max(GRID_MAX),
  ]),
  zombies: new FormControl(2, [Validators.required, Validators.min(1)]),
  creatures: new FormControl(2, [Validators.required, Validators.min(2)]),
};

export type settingsFormKeys = keyof typeof settingsFormInitControls;
