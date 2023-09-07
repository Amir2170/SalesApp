import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // behavioral subject
  private loadingSubj = new BehaviorSubject<boolean>(false);

  // loading observable for parent component to access
  public readonly loading$ = this.loadingSubj.asObservable();
  constructor() { }

  // show loading
  show() {
    this.loadingSubj.next(true);
  }

  // hide loading
  hide() {
    this.loadingSubj.next(false);
  }
}
