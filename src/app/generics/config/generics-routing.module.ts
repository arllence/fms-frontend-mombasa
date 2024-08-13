import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { LocumAttendanceComponent } from '../container/locum-attendance/main.component';
import { LocumListComponent } from '../container/locum-list/main.component';
const routes: Routes = [
  {
    path: 'locum-attendance/:employee_id/:recruit_id',
    component: LocumAttendanceComponent,
    data: {
      title: 'Locum Attendance',
      permissions: {
        only: ['SUPERUSER','HR','HHR','HOD','CEO','HOF','FINANCE'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'locum-list',
    component: LocumListComponent,
    data: {
      title: 'Locum List',
      permissions: {
        only: ['SUPERUSER','HR','HHR','HOD','CEO','HOF','FINANCE','SLT'],
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
export class GenericsRoutingModule { }
