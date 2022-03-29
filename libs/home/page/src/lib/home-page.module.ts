import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';

@NgModule({
  imports: [SharedNgCommonModule, HomePageRoutingModule],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
