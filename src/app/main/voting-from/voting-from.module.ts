
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Angular material */
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VotingFromComponent } from './voting-from.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoAuthGuardService as NoAuthGuard } from '../authentication/no-auth-guard.service';
import {MatGridListModule} from '@angular/material/grid-list';

const routes = [
    {
        path     : '**',
        component: VotingFromComponent,
        canActivate: [NoAuthGuard]
    }
];

@NgModule({
  declarations: [
      VotingFromComponent
    ],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatGridListModule
  ],
  exports     : [
    VotingFromComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class VotingFormModule { }
