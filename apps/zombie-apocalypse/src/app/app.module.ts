import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedNgCommonModule } from '@zombie-apocalypse/shared/ng/common';
import { SharedNgCoreModule } from '@zombie-apocalypse/shared/ng/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular Modules
    BrowserModule,

    // Third Party Modules

    // Core & Common Modules
    SharedNgCoreModule.forRoot(),
    SharedNgCommonModule,

    // App Module
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
