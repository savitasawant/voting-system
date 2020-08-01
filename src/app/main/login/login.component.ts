import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from './../authentication/auth.service';
import {Title} from "@angular/platform-browser"

export interface LoginData {
    email: string;
    password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'
]})
export class LoginComponent implements OnInit {

    loginForm : FormGroup;
    isSubmitting : boolean = false;
    responseData : any;
    loginApiCall : boolean;
    loginError : string = '';
    showPassword : boolean = false;

    constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router, private _authService : AuthService, private fb : FormBuilder, private title : Title) {}

    ngOnInit() {
        this.title.setTitle("Login")
        this.loginForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required, Validators.email
                ]
            ],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

    }

    onLoginFormValuesChanged() {
        this.loginError = '';
    }

    submitForm() {
        this.isSubmitting = true;

        const postData: LoginData = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }

        if (! postData.email || ! postData.password) {
            this.loginError = 'Invalid credentials';
            return true;
        }

        let reqData = {
            "data": postData
        }
        this.loginApiCall = true;
        this._authService.login(reqData).subscribe(data => {
            this.responseData = data;
            this.loginApiCall = false;
            const tokenData = {
                value: this.responseData.data,
                time: new Date().getTime()
            };

            localStorage.clear();
            this._authService.storeUserData(this.responseData.data.token, 'User', JSON.stringify(tokenData));
            this.router.navigate(['/candidate']);
        }, err => {
            console.error(err);
            this.loginApiCall = false;
            this.loginError = err.error.message;
        });

    }

    togglePassword() {
        if (this.showPassword === false) {
            this.showPassword = true;
        } else {
            this.showPassword = false;
        }
    }

}

