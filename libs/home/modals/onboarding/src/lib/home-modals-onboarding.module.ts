import { NgModule } from '@angular/core';
import { HomeModalsOnboardingComponent } from './home-modals-onboarding.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import { ButtonComponentModule } from '@zombie-apocalypse/shared/ui';

@NgModule({
  imports: [SharedNgCommonModule, ButtonComponentModule],
  declarations: [HomeModalsOnboardingComponent],
  exports: [HomeModalsOnboardingComponent],
})
export class HomeModalsOnboardingModule {}
