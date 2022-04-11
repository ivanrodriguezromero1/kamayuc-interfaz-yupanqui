import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialtModule } from "../shared/libraries/material.module";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
@NgModule({
  declarations: [
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialtModule
  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  entryComponents: []
})
export class CoreModule { }
