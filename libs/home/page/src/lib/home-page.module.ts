import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import { HomeModalsOnboardingModule } from '@zombie-apocalypse/home/modals/onboarding';
import { HomeModalsSettingsModule } from '@zombie-apocalypse/home/modals/settings';
import { BoardUiModule } from '@zombie-apocalypse/board/ui';

@NgModule({
  imports: [
    SharedNgCommonModule,
    HomePageRoutingModule,
    HomeModalsOnboardingModule,
    HomeModalsSettingsModule,
    BoardUiModule,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
