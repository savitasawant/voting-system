
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Angular material */
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from './../authentication/auth.guard.service';
import { CandidateFormComponent } from './candidate-form.component';
import { UtilService } from '../services/util.service';

const routes = [
    {
        path     : '',
        component: CandidateFormComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
  declarations: [
    CandidateFormComponent
    ],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports     : [
    CandidateFormComponent
  ],
  providers: [
    UtilService
  ]
})
export class CandidateFormModule { }
