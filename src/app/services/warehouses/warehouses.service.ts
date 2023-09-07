import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Warehouse} from "../../models/warehouse";

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  // variable containing backend error messages
  errorMessage = ''

  // url for warehouses on the server
  warehousesUrl = "https://localhost:44318/warehouses";
  constructor(private http: HttpClient) { }

  // GET : /warehouses
  // get all warehouses
  getWarehouses() {
    return this.http.get<Warehouse[]>(this.warehousesUrl);
  }
}
