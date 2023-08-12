import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, map } from "rxjs";

// local imports
import { Production } from "../../models/production";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProductionsService {
  errorMessage = '';

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
  createProductions(production: Production): Observable<Production> {
    return this.http.post<Production>(this.productionsUrl, production, this.httpOptions)
      .pipe(
        catchError(this.handleError<Production>())
      )
  }

  //DELETE: productions/id
  // request to delete selected production
  deleteProduction(id: number): Observable<Production> {
    return this.http.delete<Production>(`${this.productionsUrl}/${id}`);
      /*.pipe(
        catchError(this.handleError<Production>())
      )*/
  }

  // PUT: productions/id
  // request to update a production with object in body
  updateProduction(id: number, production: Production): Observable<Production>{
    return this.http.put<Production>(`${this.productionsUrl}/${id}`, production, this.httpOptions)
      .pipe(
        catchError(this.handleError<Production>())
      );
  }

  // GET: productions.id
  // get production by id
  getProductionById(id: number): Observable<Production>{
    return this.http.get<Production>(`${this.productionsUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Production>())
      );
  }

  // handle error function
  private handleError<T>(operation = '', result?: T) {
    // return an observable function
    return (error: HttpErrorResponse ) : Observable<T> => {
      // check if error status is 400 and if error from backend exists
        if (error.status === 400) {
          // if error from backend exists show error
          if (error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
        else if(error.status === 404) {
          if (error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
        // otherwise print error on console
        console.error(error);

        // return a type to application works normally after error
        return of(this.errorMessage as T);
      }
  }
}
