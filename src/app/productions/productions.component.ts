import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";
import {triggerOpenCloseForm, triggerShowHideError} from "../../animations/animations";
import {config, first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {DialogConfig} from "@angular/cdk/dialog";
import {ProductionCreationComponent} from "./production-creation/production-creation.component";
import {MatTable} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductionEditionComponent} from "./production-edition/production-edition.component";

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.scss'],
  animations: [
    // animation for productions table show up on button click
    triggerOpenCloseForm,
    triggerShowHideError,
  ]
})
export class ProductionsComponent implements OnInit {
  // columns to display in template
  columnsToDisplay= [
    'id', 'title', 'strategicResource',
    'code', 'warehouseId', 'edit', 'delete'
  ]

  // variable to use in showing or hiding production create form
  showCreateForm: boolean = false;

  // production to edit id
  editId: number = 0;

  // // variable to use in showing or hiding production edit form
  showEditForm: boolean = false;

  // array of productions to use in views
  productions: Production[] = [];

  // production and production edit form
  productionForm: any;

  // successful production edition
  successfulEdit: boolean = false;

  // unsuccessful production creation
  unsuccessfulEdit: boolean = false;

  // injecting service and dialogref and snackbar
  constructor(
    private productionService: ProductionsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
  }

  /* calling getProductions on ngOnInit to get all productions
   when landing on productions page */
  ngOnInit() {
    this.getProductions();
  }

  /* ****************** DELETE DIALOG ************** */
  // opening delete message dialog and deleting production if clicked yes
  openDeleteDialog(id: number) {
    const dialogref = this.dialog.open(DeleteDialogComponent);

    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduction(id);
        // show successful delete message in snackbar
        this.snackbar.open('محصول مورد نظر با موفقیت حذف شد')
      }
    })
  }

  /* ************************** PRODUCTION CREATION DIALOG FORM *********************** */
  openCreationDialog() {
    const dialogRef = this.dialog.open(ProductionCreationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productionService.createProductions({
          title: result.title,
          code: result.code,
          strategicResource: result.strategicResource,
          warehouseId: result.warehouseId
        } as Production).subscribe((data) => {
          this.getProductions();
          // show backend errors in snackbar
          if (data) {
            this.snackbar.open(this.productionService.errorMessage);
          } else {
            // successful production creation
            this.snackbar.open('محصول مورد نظر با موفقیت ثبت شد')
          }
        })
      }
    })
  }

  /* ************************** PRODUCTION EDITION DIALOG FORM *********************** */
  openEditionDialog(id: number) {
    var production: Production;
    // get production according to id
    this.productionService.getProductionById(id)
      .subscribe(result => {
        production = result;

        // open dialog
        const dialogRef = this.dialog.open(ProductionEditionComponent, {
          data: production,
        });

        // send PUT request using dialog info to server and show errors if there is any
        // SUPPLYING ID IS NECESSARY TO AVOID BACKEND ERRORS
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.productionService.updateProduction(id, {
              id: id,
              title: result.title,
              code: result.code,
              strategicResource: result.strategicResource,
              warehouseId: result.warehouseId
            } as Production)
              .subscribe(data => {
                // update productions
                this.getProductions();

                if(data) {
                  this.snackbar.open(this.productionService.errorMessage);
                } else {
                  this.snackbar.open("ویرایش محصول با موفقیت انجام شد");
                }
              })
          }
        })
      });
  }

  // get all productions from server and put them in productions array
  getProductions(): void {
    this.productionService.getProductions()
      .subscribe( productions =>
        this.productions = productions
      );
  }
  // DELETE productions/{{id}}
  // delete production with given id
  deleteProduction(id: number) {
    this.productionService.deleteProduction(id)
      .subscribe(() => {
        this.getProductions();
      })

  }
}

