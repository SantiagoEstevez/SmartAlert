import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getLoginStatus()) {
      if (next.routeConfig.path == 'login')
      {
        this.router.navigate(['dashboard']);
        return false; 
      }
      else
      {
        return true; 
      }
    }
    else {
      if (next.routeConfig.path == 'login')
      {
        return true; 
      }
      else
      {
        this.router.navigate(['login']);
        return false; 
      }     
    }
  }
}
