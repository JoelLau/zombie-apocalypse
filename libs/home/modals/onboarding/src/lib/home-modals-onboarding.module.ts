import { NgModule } from '@angular/core';
import { HomeModalsOnboardingComponent } from './home-modals-onboarding.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import {
  ButtonComponentModule,
  ModalComponentModule,
} from '@zombie-apocalypse/shared/ui';

@NgModule({
  imports: [SharedNgCommonModule, ButtonComponentModule, ModalComponentModule],
  declarations: [HomeModalsOnboardingComponent],
  exports: [HomeModalsOnboardingComponent],
})
export class HomeModalsOnboardingModule {}
