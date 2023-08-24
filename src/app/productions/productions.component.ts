import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";
import {triggerOpenCloseForm, triggerShowHideError} from "../../animations/animations";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {DialogConfig} from "@angular/cdk/dialog";

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

  // variable to pass error messages to view
  errorMessage = '';

  // unsuccessful production creation to indicate showing and hiding error
  unsuccessfulCreation: boolean = false;

  // successful production creation
  successfulCreation: boolean = false;

  // variable that indicates an item is deleted
  isDeleted: boolean = false;

  // array of productions to use in views
  productions: Production[] = [];

  // production and production edit form
  productionForm: any;

  // successful production edition
  successfulEdit: boolean = false;

  // unsuccessful production creation
  unsuccessfulEdit: boolean = false;

  // injecting service and dialogref
  constructor(
    private productionService: ProductionsService,
    private dialog: MatDialog,
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
      }
    })
  }
  /* -------------------------------- helper functions ------------------------------ */

  /* setting toggling create customer form on click */
  showCreateFormFunc() {
    this.showEditForm = false;
    this.showCreateForm = !this.showCreateForm;

    // empty form if edition has been done before it
    this.productionForm.patchValue({
      title: '',
      code: '',
      strategicResource: 0,
      warehouseId: 0,
    });
  }

  /* setting toggling edit production form on click */
  showEditFormFunc(id: number) {
    // set editId to use in edit request
    this.editId = id;

    // close create form and populate edit form with production values
    this.showCreateForm = false;
    this.showEditForm= !this.showEditForm;
    this.productionService.getProductionById(id)
      .pipe(first())
      .subscribe(
        pro =>
          this.productionForm.patchValue(pro)
      )
  }

  /* hide all messages when button is clicked */
  hideMessageFunc() {
    this.unsuccessfulCreation = false;
    this.successfulCreation = false;
    this.unsuccessfulEdit = false;
    this.successfulEdit = false;
    this.isDeleted = false
  }

  // show and hide delete successful message
  showIsDeletedMessage() {
    // first show the message then hide it
    this.isDeleted = true;
  }

  /* ------------------------------------------------------- */

  // get all productions from server and put them in productions array
  getProductions(): void {
    this.productionService.getProductions()
      .subscribe( productions =>
        this.productions = productions
      );
  }

  /* create a product and put backend related errors in errorMessage variable */
  createProduction(): void {
    // first check if form is valid
    if (this.productionForm.valid) {
      this.productionService.createProductions(
        {
          // title and code with no white space on either side
          title: this.productionForm.get('title')?.value?.trim(),
          code: this.productionForm.get('code')?.value?.trim(),
          strategicResource: this.productionForm.get('strategicResource')?.value,
          warehouseId: this.productionForm.get('warehouseId')?.value
        } as Production
      )
        .subscribe(
          (data) => {
          // get all products
          this.getProductions();

          // data is error send from handle error function in service as Observable
          if(data) {
            // set appropriate variables in each case
            // set just variable that indicates operation true all others false
            this.successfulEdit = false;
            this.unsuccessfulEdit = false;
            this.isDeleted = false;
            this.successfulCreation = false;
            this.unsuccessfulCreation = true;
            this.errorMessage = this.productionService.errorMessage;
          } else {
            this.isDeleted = false;
            this.successfulEdit = false;
            this.unsuccessfulEdit = false;
            this.unsuccessfulCreation = false;
            this.successfulCreation = true;
            // clear error message
            this.errorMessage = '';
          }
        });
    } else {
      // show this error in case form is invalid and error message is empty
      this.errorMessage = "فرم ثبت نشد. از پر بودن فیلد ها اطمینان حاصل کنید و مجدد تلاش کنید";
      this.unsuccessfulCreation = true;
      this.unsuccessfulEdit = false;
      this.successfulEdit = false;
      this.successfulCreation = false;
      this.isDeleted = false
    }
  }

  // DELETE productions/{{id}}
  // delete production with given id
  deleteProduction(id: number) {
    this.productionService.deleteProduction(id)
      .subscribe(() => {
        this.getProductions();

        // show delete successful
        this.isDeleted = true;

        // set all other variables false to show this message
        this.successfulCreation = false;
        this.unsuccessfulCreation = false
        this.successfulEdit = false;
        this.unsuccessfulEdit = false;
      })

  }

  // PUT: productions/{{id}}
  // update a product with given id to product in request body
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
}

