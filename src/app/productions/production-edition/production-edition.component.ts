import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductionFromComponent} from "../production-from/production-from.component";
import {Production} from "../../models/production";

@Component({
  selector: 'app-production-edition',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    ProductionFromComponent,
  ],
  templateUrl: './production-edition.component.html',
  styleUrls: ['./production-edition.component.scss']
})
export class ProductionEditionComponent {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductionEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Production,
  ) {}

  // reusing production from controls
  // production edition from
  // populate the form with data of the product to edit
  productionEdition: FormGroup = this.formBuilder.group({
    production: [this.data],
  });

  // when user clicks no close the dialog and send false to main production component
  onNoClick() {
    this.dialogRef.close(false);
  }

  // when user clicks yes close the dialog and send info to main production component
  onYesClick() {
    this.dialogRef.close(this.productionEdition.get('production')?.value)
  }
}
