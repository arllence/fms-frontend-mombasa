import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})

export class ChangePasswordGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthenticationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const change_password  = this.authService.requiresPasswordChange();
    if (change_password) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;

    }
    // return this.loginService.isAuthenticated();
  }

}
