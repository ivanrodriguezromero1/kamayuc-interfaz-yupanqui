import { CommonModule, registerLocaleData } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { MaterialtModule } from 'src/app/shared/libraries/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@NgModule({
    declarations: [
      DashboardComponent,
     
    ],
    imports: [
      CommonModule,
      DashboardRoutingModule,
      MaterialtModule,
      SharedModule,
      MaterialtModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }]
  })
  export class DashboardModule { }
  