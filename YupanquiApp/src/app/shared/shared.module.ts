
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CoreModule } from '../core';
import { MaterialtModule } from './libraries/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialtModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialtModule
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers: [
  ],
})

export class SharedModule { }
