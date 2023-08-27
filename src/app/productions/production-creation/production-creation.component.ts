import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductionFromComponent} from "../production-from/production-from.component";
import {Production} from "../../models/production";

@Component({
  standalone: true,
  selector: 'app-production-creation',
  templateUrl: './production-creation.component.html',
  styleUrls: ['./production-creation.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    ProductionFromComponent,
  ]
})
export class ProductionCreationComponent {

    // containing form values
    local_data: any;

    constructor(
      private dialogRef: MatDialogRef<ProductionCreationComponent>,
      private formBuilder: FormBuilder,
      // passing form data to production component
      @Inject(MAT_DIALOG_DATA) public data: Production,
    ) {
      this.local_data = {...data};
    }

  // reusing production from controls
  // production creation from
  productionCreation: FormGroup = this.formBuilder.group({
    production: [],
  });

  // when user clicks no close the dialog and send false to main production component
  onNoClick() {
    this.dialogRef.close(false);
  }

  // when user clicks yes close the dialog and send info to main production component
  onYesClick() {
    // validation has been done on template side and locked submit button
    return this.dialogRef.close(this.productionCreation.get('production')?.value)
  }
}
