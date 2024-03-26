import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { QuoteComponent } from '../container/create/main.component';
import { ViewRequestsComponent } from '../container/view/main.component';
import { DetailRequestComponent } from '../container/detail/main.component';
import { ViewSalaryRequestsComponent } from '../container/salary/main.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: DetailRequestComponent,
    data: {
      title: 'View Request',
      permissions: {
        only: ['USER_MANAGER','VIEWER','HOD','SLT', 'CEO', 'HOF','USER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: QuoteComponent,
    data: {
      title: 'Create Quote',
      permissions: {
        only: ['USER_MANAGER','USER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'list',
    component: ViewRequestsComponent,
    data: {
      title: 'Travel Requests',
      permissions: {
        only: ['USER_MANAGER','USER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'salary',
    component: ViewSalaryRequestsComponent,
    data: {
      title: 'Salary Requests',
      permissions: {
        only: ['USER_MANAGER','USER','HOD','SLT', 'CEO', 'HOF'],
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
