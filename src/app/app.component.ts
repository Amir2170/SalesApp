import { Component } from '@angular/core';
import {LoadingService} from "./services/loading/loading.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SalesAppAngular';

  /* a variable showing which nav item is clicked
  *  default value is 6 to add active class on home nav item on landing */
  clicked = 6

  /* function setting number of nav item
  clicked fo ngModel to toggle active class */
  selectNavItem(num: number) {
    this.clicked = num;
  }

  // injecting loading service to access the observable in view
  constructor(private loader: LoadingService) {}

  // accessing observable from service
  loading$ = this.loader.loading$;
}
