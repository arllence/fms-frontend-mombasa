import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { QuoteComponent } from '../container/create/main.component';
import { ViewRequestsComponent } from '../container/view/main.component';
import { DetailRequestComponent } from '../container/detail/main.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: DetailRequestComponent,
    data: {
      title: 'View Request',
      permissions: {
        only: ['USER_MANAGER','VIEWER','HOD','SLT','USER'],
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
        only: ['USER_MANAGER','USER','HOD','SLT'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'list',
    component: ViewRequestsComponent,
    data: {
      title: 'Requests',
      permissions: {
        only: ['USER_MANAGER','USER','HOD','SLT'],
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
