import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/user/login/login.component';
import { ResetPasswordComponent } from './features/user/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api/user/reset/:userId/:token', component: ResetPasswordComponent },
  { path: 'main', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  // Add other routes as needed
  { path: '**', redirectTo: 'main' } // Redirect any unknown routes to 'main'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
