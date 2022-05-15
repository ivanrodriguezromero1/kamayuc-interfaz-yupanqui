import { CommonModule, registerLocaleData } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, Renderer2,ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'src/app/shared/libraries/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import localeEs from '@angular/common/locales/es';
import { RoverMapComponent } from './rover-map/rover-map.component';
registerLocaleData(localeEs, 'es');

@NgModule({
    declarations: [
      DashboardComponent,
      RoverMapComponent
    ],
    imports: [
      CommonModule,
      DashboardRoutingModule,
      SharedModule,
      MaterialModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }]
  })
  export class DashboardModule { }
  