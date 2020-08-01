import { Routes } from '@angular/router';
// import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'candidate',
      loadChildren: () => import('./main/candidate-form/candidate-form.module').then(m => m.CandidateFormModule)
    },
    {
      path: 'voting',
      loadChildren: () => import('./main/voting-from/voting-from.module').then(m => m.VotingFormModule)
    },
    { path: '**', redirectTo: 'candidate', pathMatch: 'full'},
    // { path: '**', component: PageNotFoundComponent }
];
