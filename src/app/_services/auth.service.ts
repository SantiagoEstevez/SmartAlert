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

  async login(oUser: User) {
    console.log("Me voy a loguear con: " + oUser.username);

    let userData64: string = `${oUser.username}:${oUser.password}`;
    this.headers = this.headers.set("Authorization", "Basic " + btoa(userData64));

    const url = `${environment.api_urlbase}rest/seguridad/token`;
    //const url = `${environment.api_urlbase}values/token`;

    this.http.get(url, {observe: 'response', headers : this.headers})
      .subscribe(
        res => {
          this.cookieService.set('@easyaler::token', res.body['securityToken']);

          let user: User;
          this.getUser().subscribe(res => {
            user = res.body;
            this.setUserCookie(user);
          });

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

  getUser() {
    const url = `${environment.api_urlbase}rest/usuario/getDatosUsuario`;
    return this.http.get<User>(url, {observe: 'response'}).pipe(res => res);
  }

  setUserCookie(user: User) {
    this.cookieService.delete('@easyaler::user');
    this.cookieService.set('@easyaler::user', JSON.stringify(user));
  }

  getUserCookie() : User {
    if (this.cookieService.check("@easyaler::user")) {
      return <User>JSON.parse(this.cookieService.get('@easyaler::user'));
    }{
      return new User();
    }
  }

  async logout() {
    this.cookieService.delete("@easyaler::token");
    await this.cookieService.deleteAll();
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
