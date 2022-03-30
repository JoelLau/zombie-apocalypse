import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BoardDataAccessService } from '@zombie-apocalypse/board/data-access';

@Component({
  selector: 'zombie-apocalypse-home-modals-settings',
  templateUrl: './home-modals-settings.component.html',
  providers: [BoardDataAccessService],
})
export class HomeModalsSettingsComponent {
  settingsForm: FormGroup = this.formBuilder.group({
    size: [2, [Validators.required, Validators.min(2)]],
    // extra controls, will not be sent
    sizeExtra: [2, [Validators.required, Validators.min(2)]],
    zombies: [0, [Validators.required, Validators.min(1)]],
    creatures: [0, [Validators.required, Validators.min(1)]],
  });

  get sizeFormControl(): FormControl {
    return this.settingsForm.controls['size'] as FormControl;
  }

  get sizeExtraFormControl(): FormControl {
    return this.settingsForm.controls['sizeExtra'] as FormControl;
  }

  get zombiesFormControl(): FormControl {
    return this.settingsForm.controls['zombies'] as FormControl;
  }

  get creaturesFormControl(): FormControl {
    return this.settingsForm.controls['creatures'] as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {
    this.sizeFormControl.valueChanges.subscribe((data) =>
      this.sizeExtraFormControl.setValue(data, { emitEvent: false })
    );
    this.sizeExtraFormControl.valueChanges.subscribe((data) =>
      this.sizeFormControl.setValue(data, { emitEvent: false })
    );
  }
}
