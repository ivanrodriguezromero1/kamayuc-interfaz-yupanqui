import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/libraries/material.module";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { MyDialogAboutComponent } from "./Components/my-dialog-about/my-dialog-about.component";
@NgModule({
  declarations: [MyDialogAboutComponent
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  entryComponents: []
})
export class CoreModule { }
