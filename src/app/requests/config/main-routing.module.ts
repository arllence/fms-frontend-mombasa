import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ViewRequestsComponent } from '../container/view/main.component';
import { DetailRequestComponent } from '../container/detail/main.component';
import { RcaDetailRequestComponent } from '../container/rca/main.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: DetailRequestComponent,
    data: {
      title: 'View Incident',
      permissions: {
        only: [],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'list',
    component: ViewRequestsComponent,
    data: {
      title: 'Incidents',
      permissions: {
        only: [],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'rca/:id',
    component: RcaDetailRequestComponent,
    data: {
      title: 'RCA',
      permissions: {
        only: [],
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

export class MainRoutingModule { }
