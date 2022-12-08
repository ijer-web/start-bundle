import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {LoaderService} from '../services/loaderService/loader.service';
import {environment} from '../../../environments/environment';
import {delay} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.backendUrl)) {
      this.loaderService.addRequest(request.url);
    }
    return next.handle(request)
      .pipe(catchError((err) => {
        this.loaderService.removeRequest(request.url);
        return err;
      }))
      .pipe(
        delay(3000),
        map((evt: any) => {
          if (evt instanceof HttpResponse) {
            this.loaderService.removeRequest(request.url);
          }
          return evt
        }));
  }
}
