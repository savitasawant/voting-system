import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {

  constructor(public _authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      // this._authService.layout.showNavbar = false;
      // this._authService.layout.showToolbar = false;
      this.router.navigate(['/files']);
      return false;
    }
    return true;
  }

}
