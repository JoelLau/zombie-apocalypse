import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import { HomeModalsOnboardingModule } from '@zombie-apocalypse/home/modals/onboarding';

@NgModule({
  imports: [
    SharedNgCommonModule,
    HomePageRoutingModule,
    HomeModalsOnboardingModule,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
