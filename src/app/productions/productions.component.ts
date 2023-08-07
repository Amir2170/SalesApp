import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";
import {triggerOpenCloseForm, triggerShowHideError} from "../../animations/animations";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {delay} from "rxjs";


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
  // variable to indicate to not a show a error in view
  hideMessage: boolean = true;

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

  /* setting toggling create customer form on click */
  showCreateFormFunc() {
    this.showCreateForm = !this.showCreateForm;
  }

  /* hide and remove message when button is clicked */
  hideMessageFunc() {
    this.hideMessage = true;
  }

  // get all productions from server and put them in productions array
  getProductions(): void {
    this.productionService.getProductions()
      .subscribe( productions =>
        this.productions = productions
      );
  }

  createProduction(): void {
    // on successful submite hide message
    this.hideMessageFunc();

    // first create a new object
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
        .subscribe(production => {
          // get all products
          this.getProductions();
          // put errors in this variable
          this.errorMessage = this.productionService.errorMessage;
          this.hideMessage = false;
        })
    }
  }
}

