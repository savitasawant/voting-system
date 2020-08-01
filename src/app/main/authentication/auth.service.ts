import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from './../../../global.variables';
import { Router } from '@angular/router';
import { UtilService } from './../services/util.service';

@Injectable()
export class AuthService {

  domain = url.toString(); // Development Domain - Not Needed in Production
  authToken;
  user;
  options;
  public store = [];
  layout = {
    showNavbar: false,
    showToolbar: false
  }


  constructor(public http: HttpClient, private router: Router, public utilService: UtilService) {
  }


  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  login(user) {
    return this.http.post(this.domain + 'login', user);
  }

  register(payload) {
    return this.http.post(this.domain + 'register-shipper', payload);
  }

  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
    this.router.navigate(['login']);
  }

  // Function to store user's data in client local storage
  storeUserData(token, user, tokenData) {
    localStorage.setItem('authToken', tokenData);
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', user); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  isAuthenticated() {
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    let user_authenticated = false
    if (tokenData ) {
      this.utilService.userData = tokenData.value;
      delete this.utilService.userData["token"];
      user_authenticated = true;
    }else{
      user_authenticated = false;
    }
    this.utilService.setLayout(user_authenticated);
    return user_authenticated;
  }
}
