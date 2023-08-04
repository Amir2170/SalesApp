import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

// local import
import { HomeComponent } from "../../home/home.component";
import { ProductionsComponent } from "../../productions/productions.component";


// routes array
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'productions', component: ProductionsComponent },
  { path: '', redirectTo: '/home', pathMatch: "full"}, // landing route
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
