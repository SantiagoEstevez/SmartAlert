import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private cookieService: CookieService,
        private authService: AuthService
    ) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       // Get the auth header from your auth service.
       const authReq = req.clone({headers: req.headers
        .set('SecurityToken', `${this.cookieService.get("@easyaler::token")}`)
        .set('Content-Type', 'application/json')
       });

       return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            //console.log("Autorizado");
        }
        }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log("no autorizado.");
                    this.authService.logout();
                }
            }
        }));
   }
}
