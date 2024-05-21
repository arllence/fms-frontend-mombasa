import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { MainReportComponent } from '../container/requests/main.component';
import { ReplacementsReportComponent } from '../container/transport/main.component';
import { FlightReportComponent } from '../container/flights/main.component';
import { JourneyReportComponent } from '../container/journeys/main.component';
const routes: Routes = [

  {
    path: 'requisitions',
    component: MainReportComponent,
    data: {
      title: 'Requisitions Report',
      permissions: {
        only: ['USER_MANAGER','ADMINISTRATOR','HR','VIEWER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'replacements',
    component: ReplacementsReportComponent,
    data: {
      title: 'Replacements',
      permissions: {
        only: ['USER_MANAGER','ADMINISTRATOR','HR','VIEWER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  // {
  //   path: 'flights',
  //   component: FlightReportComponent,
  //   data: {
  //     title: 'Flight Schedules',
  //     permissions: {
  //       only: ['USER_MANAGER','ADMINISTRATOR','HR','VIEWER','HOD','SLT', 'CEO', 'HOF'],
  //       redirectTo: '/500'
  //     }
  //   },
  //   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  // },
  // {
  //   path: 'journeys',
  //   component: JourneyReportComponent,
  //   data: {
  //     title: 'Employee Journeys',
  //     permissions: {
  //       only: ['USER_MANAGER','ADMINISTRATOR','HR','VIEWER','HOD','SLT', 'CEO', 'HOF'],
  //       redirectTo: '/500'
  //     }
  //   },
  //   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
