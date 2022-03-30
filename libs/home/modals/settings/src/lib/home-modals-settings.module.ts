import { NgModule } from '@angular/core';
import { HomeModalsSettingsComponent } from './home-modals-settings.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import {
  ButtonComponentModule,
  ModalComponentModule,
} from '@zombie-apocalypse/shared/ui';

@NgModule({
  declarations: [HomeModalsSettingsComponent],
  exports: [HomeModalsSettingsComponent],
  imports: [SharedNgCommonModule, ModalComponentModule, ButtonComponentModule],
})
export class HomeModalsSettingsModule {}
