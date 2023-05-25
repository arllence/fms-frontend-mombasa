import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      title: 'Welcome',
      extraParameter: 'home',
      permissions: {
      // only: [''],
        redirectTo: '/500'
          }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
