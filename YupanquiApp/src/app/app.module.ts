import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './areas/areas-shared/sidenav/sidenav.component';
import { ToolbarComponent } from './areas/areas-shared/toolbar/toolbar.component';
import { DashboardComponent } from './areas/dashboard/dashboard.component';
import { MaterialtModule } from './shared/libraries/material.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
