import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { HomeComponent } from '../container/home/main.component';
import { IncidentRequestComponent } from '../container/incident/main.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
      permissions: {
        only: [],
        redirectTo: '/500'
      }
    },
    // canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'submission',
    component: IncidentRequestComponent,
    data: {
      title: 'Submission',
      permissions: {
        only: [],
        redirectTo: '/500'
      }
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericsRoutingModule { }
