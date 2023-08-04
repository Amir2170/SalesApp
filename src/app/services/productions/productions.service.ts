import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs";

// local imports
import { Production } from "../../models/production";

@Injectable({
  providedIn: 'root'
})
export class ProductionsService {

  // url for productions on server
  private productionsUrl: string = "https://localhost:44318/productions"

  // http options for post and put requests
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  // injecting httpClient
  constructor(private http: HttpClient) { }

  // GET: /productions
  // request to get all productions
  getProductions(): Observable<Production[]> {
    return this.http.get<Production[]>(this.productionsUrl);
  }

  // POST: /productions
  // send post request to create a new customer
}
