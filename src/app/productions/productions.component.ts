import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

// local imports
import { Production } from "../models/production";
import { ProductionsService } from "../services/productions/productions.service";

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.scss']
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
  customerForm = new FormGroup({
    title: new FormControl(''),
    strategicResource: new FormControl(''),
    code: new FormControl(''),
    warehouseId: new FormControl(''),
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
}
