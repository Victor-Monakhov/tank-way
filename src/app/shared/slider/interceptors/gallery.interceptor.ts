import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ImagesPage} from "../services/gallery.service";

@Injectable()
export class GalleryInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
        setHeaders: {
          Authorization: '563492ad6f917000010000018550af4ae3b941f1b5605270941a403b'
        },
      });
    return next.handle(request);
  }
}
