import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-production-creation',
  templateUrl: './production-creation.component.html',
  styleUrls: ['./production-creation.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class ProductionCreationComponent {

    constructor(
      private dialogRef: MatDialogRef<ProductionCreationComponent>,
      private formBuilder: FormBuilder
    ) {}

  // reusing production from controls
  // production creation from
  productionCreation: FormGroup = this.formBuilder.group({
    production: [],
  });

}
