import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
      console.log('token not valid');
      return false;
    }
    if(!(this.auth.isUserHaveRole('admin'))){
      this.router.navigateByUrl('/unauthorized')
      console.log('you are not admin');
      return false;
    }
    return true;
  }
}
