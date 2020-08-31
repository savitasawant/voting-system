import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;
@Injectable()
export class UtilService {

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

  public postElectionList(payload){
    return this.http.post(API_URL + 'node/api/position', payload);
  }

  public getElectionList(){
    return this.http.get(API_URL + 'node/positions');
  }

  public createVote(payload){
    return this.http.post(API_URL + 'node/vote', payload);
  }

  public getElectionTime(){
    return this.http.get(API_URL + 'node/dates');
  }

  public postElectionTime(payload){
    return this.http.post(API_URL + 'node/api/dates', payload);
  }

  public putElectionTime(id, payload){
    return this.http.put(API_URL + 'node/api/dates/'+id, payload);
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
