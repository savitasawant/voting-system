import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from './../../../global.variables';
import { Router } from '@angular/router';

// import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
// import { ComponentPortal } from '@angular/cdk/portal';
// import { ProgressSpinnerComponent } from './../../layout/progress-spinner/progress-spinner.component';
// import { SupportedFile, Vendor, Subvendor, InclusionList, fieFilterObj } from './../interfaces';


@Injectable()
export class UtilService {

  domain = url.toString();

  layout = {
    showNavbar: false,
    showToolbar: false
  };
  userData : any;
  isLoading : boolean = true;
  response : any;
  title : string;
  toolbarOptions : any;

  constructor(public http: HttpClient, private router: Router) {
  }

  setLayout(user_authenticated){
    this.layout.showToolbar = user_authenticated;
    this.layout.showNavbar = user_authenticated;
    this.toolbarOptions = {
      'buttons': [],
      'search': {
        show: false,
        filter: null
      }
    }
  }

}
