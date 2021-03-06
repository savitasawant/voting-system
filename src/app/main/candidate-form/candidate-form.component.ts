import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { FormBuilder, Validators, FormGroup,FormArray } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PositionFormComponent } from './position-form/position-form.component';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  displayForm : boolean = false;
  response : any;
  error: any;
  isLoading: boolean;
  electionData: any[] = [];
  electionTime: any = null;
  today: any = new Date();
  electionDate: any = null;
  isDisabled : boolean = false;
  showResult: boolean = false;
  changeTime: boolean = false;

  constructor( public utilService: UtilService, private formBuilder: FormBuilder, private matDialog: MatDialog ) { }

  ngOnInit() {
    this.showResult = false;
    this.isLoading = true;
    this.electionDate = {
      start_date : null,
      expiry_date: null
    }
    this.getElectionTime();
  }

  getElectionTime(){
    this.utilService.getElectionTime().subscribe(data => {
      this.response = data;
      this.electionTime = this.response.data.length ? this.response.data[0] : null;

      if(this.electionTime){
        this.changeTime = true;
        this.electionDate.start_date = this.electionTime.start_date;
        this.electionDate.expiry_date = this.electionTime.expiry_date;

        let start_date = new Date(this.electionTime.start_date);
        let expiry_date = new Date(this.electionTime.expiry_date);

        if (start_date.getTime() < this.today.getTime() && this.today.getTime() < expiry_date.getTime()) {
          this.displayForm = false;
          this.isLoading = false;
        }else if(this.today.getTime() > expiry_date.getTime()){
          this.showResult = true;
          this.getElectionList();
        }
        else{
          this.getElectionList();
          this.displayForm = true;
        }
      }else{
        this.getElectionList();
        this.displayForm = true;
      }

    },
    err => {
      this.error = err;
      console.error(this.error);
      this.isLoading = false;
    });
  }

  getElectionList(){
    this.utilService.getElectionList().subscribe(data => {
      this.response = data;
      this.electionData = this.response.data.positions;
      this.isLoading = false;
    },
    err => {
      this.error = err;
      console.error(this.error);
      this.electionData = [];
      this.isLoading = false;
    });
  }

  submitDate(element){

    if (!element.start_date || !element.expiry_date) {
      alert('Please select start and end date.');
      return;
    }

    this.isDisabled = true;
    let payload = {
      data : element
    }
    this.utilService.postElectionTime(payload).subscribe(data => {
      this.response = data;
      this.isDisabled = false;
      window.location.reload();
    },
    err => {
      this.error = err;
      this.isDisabled = false;
      console.error(this.error);
    });
  }

  UpdateDate(element){
    if (!element.start_date || !element.expiry_date) {
      alert('Please select start and end date.');
      return;
    }

    this.isDisabled = true;
    let payload = {
      data : element
    }
    this.utilService.putElectionTime(this.electionTime._id, payload).subscribe(data => {
      this.response = data;
      this.isDisabled = false;
      window.location.reload();
    },
    err => {
      this.error = err;
      this.isDisabled = false;
      console.error(this.error);
    });
  }

  // create new data
  addPosition(){

    let payload = {
        // "data":{
        //     "name" : "Joint Treasurer सह-खजिनदार",
        //     "candidates" : [
        //         {
        //             "name": "अजय जाधव",
        //             "total_vote": 0,
        //             "age": 0,
        //             "phone": null,
        //             "email": null
        //         },
        //         {
        //             "name": "विजय खारकर",
        //             "total_vote": 0,
        //             "age": 0,
        //             "phone": null,
        //             "email": null
        //         }
        //     ]
        // }
    };

    this.utilService.postElectionList(payload).subscribe(data => {
      window.location.reload();
    },
    err => {
      this.error = err;
      console.error(this.error);
      this.isLoading = false;
    });

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   // appDetails : this.appDetails,
    //   // isEditModal : this.isEditModal,
    //   // permissionList : this.permissionList
    // },
    // dialogConfig.disableClose = true;
    // let dialogRef = this.matDialog.open(PositionFormComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //     data => {
    //       if(data == 'success'){
    //         // this.getAppList();
    //         // this.appList.unshift(dialogConfig.data.appDetails);
    //       }
    //     }
    // );
  }
}
