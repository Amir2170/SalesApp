import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../services/loading/loading.service";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  // injecting loading service
  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // show the spinner whenever intercept is called
    this.loader.show();
    return next.handle(request).pipe(
      finalize(() => {
        // hide it on finalizing observable
        this.loader.hide();
      })
    )
  }
}
