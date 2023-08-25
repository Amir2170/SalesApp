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

  // PUT: productions/{{id}}
  // update a product with given id to product in request body
  /*
  updateProduction() {

    if (this.productionForm.valid) {
      this.productionService.updateProduction(this.editId, {
        // title and code with no white space on either side
        title: this.productionForm.get('title')?.value?.trim(),
        code: this.productionForm.get('code')?.value?.trim(),
        strategicResource: this.productionForm.get('strategicResource')?.value,
        warehouseId: this.productionForm.get('warehouseId')?.value,
        id: this.editId
      } as Production)
        .subscribe( (data) => {
          // get all products
          this.getProductions();

          // data is error send from handle error function in service as Observable
          if(data) {
            // set appropriate variables in each case
            // set just variable that indicates operation true all others false
            this.isDeleted = false;
            this.successfulCreation = false;
            this.unsuccessfulCreation = false;
            this.unsuccessfulEdit = true;
            this.successfulEdit = false;
            this.errorMessage = this.productionService.errorMessage;
          } else {
            this.successfulEdit = true;
            this.unsuccessfulEdit = false;
            this.isDeleted = false;
            this.unsuccessfulCreation = false;
            this.successfulCreation = false;
            // clear error message
            this.errorMessage = '';
          }
        });
    } else {
      // show this error in case form is invalid and error message is empty
      this.errorMessage = "فرم ثبت نشد. از پر بودن فیلد ها اطمینان حاصل کنید و مجدد تلاش کنید";
      this.unsuccessfulCreation = false;
      this.unsuccessfulEdit = true;
      this.successfulEdit = false;
      this.successfulCreation = false;
      this.isDeleted = false
    }
  }

   */
}

