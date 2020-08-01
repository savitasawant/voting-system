import { Component, OnInit } from '@angular/core';
import { AuthService } from './main/authentication/auth.service';
import { Router } from '@angular/router';
import { UtilService } from './main/services/util.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavbar : boolean;
  showToolbar : boolean;


  constructor( private _authService: AuthService, private router: Router, public utilService: UtilService ) {

  }

  ngOnInit(){


  }
}
