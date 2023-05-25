import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { complete_profile_url } from 'src/app/app.constants';
@Injectable({
  providedIn: 'root'
})

export class UpdateProfileGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthenticationService, private http: HttpClient, ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      this.http.get<[]>(complete_profile_url).subscribe((res:any) => {
        const response: any = res;
        console.log(response)
  
        if (response == "404") {
          this.authService.setRequiresProfileUpdate(true)
          this.router.navigate(['/update-profile']);          
          return true;
        } else {
          this.authService.setRequiresProfileUpdate(false)
          return false;
  
        }
  
      })
    return true
  }

}
