import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { MainReportComponent } from '../container/requests/main.component';
const routes: Routes = [

  {
    path: 'feedbacks',
    component: MainReportComponent,
    data: {
      title: 'Incidents Report',
      permissions: {
        only: ['SUPERUSER','ADMINISTRATOR','HR','VIEWER','HOD','SLT', 'CEO', 'HOF', 'FMS_ADMIN'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
