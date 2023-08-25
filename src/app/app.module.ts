import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// angular materials
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from "@angular/material/table";

// local imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routes/app-routing/app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ProductionsComponent } from './productions/productions.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    // dialog text directions right to left
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {direction: 'rtl'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:
        {direction: 'rtl', duration: 3000, panelClass:'snackbar-center'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
