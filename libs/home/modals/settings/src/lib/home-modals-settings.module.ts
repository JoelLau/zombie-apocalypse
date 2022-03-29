import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModalsSettingsComponent } from './home-modals-settings.component';
import { ModalComponentModule } from '@zombie-apocalypse/shared/ui';

@NgModule({
  declarations: [HomeModalsSettingsComponent],
  exports: [HomeModalsSettingsComponent],
  imports: [CommonModule, ModalComponentModule],
})
export class HomeModalsSettingsModule {}
