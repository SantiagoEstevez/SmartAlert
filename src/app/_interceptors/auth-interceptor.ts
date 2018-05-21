import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private cookieService: CookieService
    ) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // Get the auth header from your auth service.
       const authReq = req.clone({headers: req.headers
        .set('SecurityToken', `${this.cookieService.get("@easyaler::token")}`)
        .set('Content-Type', 'application/json')
       });

       return next.handle(authReq);
   }
}
