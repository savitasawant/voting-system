
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }


  canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/voting']);
      return false;
    }
    return true;
  }

}
