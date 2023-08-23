import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@Component({
  standalone: true,
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls:[
    './delete-dialog.component.scss'
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) {}

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
