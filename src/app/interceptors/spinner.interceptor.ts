import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {
  timer: any;

  constructor( private spinnerService: SpinnerService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url === './assets/i18n/en.json' || req.url === './assets/i18n/es.json') {
      return next.handle(req);
    } else {
      this.spinnerService.showSpinner();
      return next.handle(req).pipe(
        finalize( () => this.spinnerService.hideSpinner())
      );
    }
  }
}
