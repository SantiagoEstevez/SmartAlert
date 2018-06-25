import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  login(oUser: User): any {
    console.log("Me voy a loguear con: " + oUser.username);
    
    let userData64: string = `${oUser.username}:${oUser.password}`;
    this.headers = this.headers.set("Authorization", "Basic " + btoa(userData64));
    const url = `${environment.api_urlbase}rest/seguridad/token`;
    //const url = `${environment.api_urlbase}values/token`;

    this.http.get(url, {observe: 'response', headers : this.headers})
      .subscribe(
        res => {
          console.log('1');
          this.cookieService.set('@easyaler::token', res.body['securityToken']);
          this.cookieService.set('@easyaler::user', "user model");
          this.router.navigate(['dashboard']);
          return true;
        },
        err => {
          console.log("error");
          console.log(err);
          return false;
        }
      );
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  getLoginStatus(): boolean {
    if (this.cookieService.check("@easyaler::token")) {
      return true;
    } else {
      return false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
