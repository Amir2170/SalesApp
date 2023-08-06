import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";
import { triggerOpenCloseForm } from "../../animations/animations";


@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.scss'],
  animations: [
    // animation for productions table show up on button click
    triggerOpenCloseForm,
  ]
})
export class ProductionsComponent implements OnInit {
  // variable to use in showing or hiding customer create form
  showCreateForm: boolean = false;

  // array of productions to use in views
  productions: Production[] = [];

  // injecting service
  constructor(private productionService: ProductionsService) {
  }

  /* calling getProductions on ngOnInit to get all productions
   when landing on productions page */
  ngOnInit() {
    this.getProductions();
  }

  // customer form group
  productionForm = new FormGroup({
    title: new FormControl(''),
    strategicResource: new FormControl(0),
    code: new FormControl(''),
    warehouseId: new FormControl(0, Validators.required ),
  });

  /* setting toggling create customer form on click */
  showCreateFormFunc() {
    this.showCreateForm = !this.showCreateForm;
  }

  // get all productions from server and put them in productions array
  getProductions(): void {
    this.productionService.getProductions()
      .subscribe( productions =>
        this.productions = productions
      );
  }

  createProduction(): void {
    // first create a new object
    this.productionService.createProductions(
      {
        title: this.productionForm.get('title')?.value?.trim(),
        code: this.productionForm.get('code')?.value?.trim(),
        strategicResource: this.productionForm.get('strategicResource')?.value,
        warehouseId: this.productionForm.get('warehouseId')?.value
      } as Production
    )
      .subscribe(production => {
        this.productions.push(production);
        this.getProductions();
      })
  }
}
