import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";
import {triggerOpenCloseForm, triggerShowHideError} from "../../animations/animations";


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
  // variable to use in showing or hiding customer create form
  showCreateForm: boolean = false;

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

  // production form
  productionForm: any;

  // injecting service
  constructor(private productionService: ProductionsService) {
  }

  /* calling getProductions on ngOnInit to get all productions
   when landing on productions page */
  ngOnInit() {
    this.getProductions();

    // production form group initialization
    this.productionForm = new FormGroup({
      title: new FormControl('',[
        Validators.required,
      ]),
      strategicResource: new FormControl(0,[
        Validators.required
      ]),
      code: new FormControl('',[
        Validators.required
      ]),
      warehouseId: new FormControl(0,[
        Validators.required
      ]),
    });
  }

  // convenience getter for easy access to form fields
  get formTitle() { return this.productionForm.get('title') };
  get formcode() { return this.productionForm.get('code') };
  get formstrategicResource() { return this.productionForm.get('strategicResource') };
  get formWarehouseId() { return this.productionForm.get('warehouseId') };

  /* -------------------------------- helper functions ------------------------------ */

  /* setting toggling create customer form on click */
  showCreateFormFunc() {
    this.showCreateForm = !this.showCreateForm;
  }

  /* hide messages when button is clicked */
  hideMessageFunc() {
    this.unsuccessfulCreation = false;
    this.successfulCreation = false;
    this.isDeleted = false
  }

  // show and hide delete successful message
  showIsDeletedMessage() {
    // first show the message then hide it
    this.isDeleted = true;

    setTimeout(() => {
      this.isDeleted = false;
    }, 3000);
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
            this.isDeleted = false;
            this.successfulCreation = false;
            this.unsuccessfulCreation = true;
            this.errorMessage = this.productionService.errorMessage;
          } else {
            this.isDeleted = false;
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

        // set all other variables to false to show this message
        this.successfulCreation = false;
        this.unsuccessfulCreation = false
      })
  }
}

