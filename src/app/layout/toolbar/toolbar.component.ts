import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/authentication/auth.service';
import { UtilService } from 'src/app/main/services/util.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _authService: AuthService, public utilService: UtilService) { }

  ngOnInit() {
  }

  logout(){
    this._authService.logout();
  }

}
