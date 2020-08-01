import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { FormBuilder, Validators, FormGroup,FormArray } from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-voting-from',
  templateUrl: './voting-from.component.html',
  styleUrls: ['./voting-from.component.scss']
})
export class VotingFromComponent implements OnInit {
  response : any;
  error: any;
  isLoading: boolean;
  electionData: any[];
  votingForm : FormGroup;
  isDisabled: boolean = false;
  message: any;

  constructor(public utilService: UtilService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    if( localStorage.getItem('voting')){
      this.message = localStorage.getItem('voting');
    }else{
      this.message = "";
      this.isLoading = true;
      this.getElectionList();
    }
  }

  generateForm(){
    let arr = [];
    if(this.electionData.length){
      for(let i = 0; i< this.electionData.length; i++)  {
        arr.push( this.createSubForm(this.electionData[i].name) )
      }
    }else{
      arr.push( this.createSubForm('') )
    }

    // Building app form
    this.votingForm = this.formBuilder.group({
      // ip_address: [''],
      email: [''],
      name: ['', [Validators.required]],
      votes: this.formBuilder.array(arr)
    });
    this.isLoading = false;
    // this.votingForm.patchValue(this.data.appDetails);
  }

  // building sub app array
  createSubForm(name): FormGroup {
    return this.formBuilder.group({
      position: name,
      selected_candidate: ['', [Validators.required]],
    });
  }

  getVotes() : FormArray {
    return this.votingForm.get("votes") as FormArray
  }

  getElectionList(){
    this.utilService.getElectionList().subscribe(data => {
        this.response = data;
        this.electionData = this.response.data.positions;
        // this.isLoading = false;

        this.generateForm();
      },
      err => {
        this.error = err;
        console.error(this.error);
        this.electionData = [];
        this.isLoading = false;
      });
  }

  submitVote(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.isDisabled = true;

      let payload = {
        data : form.value
      }
      this.utilService.createVote(payload).subscribe(data => {
        this.response = data;
        localStorage.setItem('voting', 'Thank You For Voting!!');
        this.message = localStorage.getItem('voting');
      },
      err => {
        this.error = err;
        // this.snackBar.open(this.error.message, '', { duration: 2000 });
        this.isDisabled = false;
        console.error(this.error);
      });
    }

  }

}
