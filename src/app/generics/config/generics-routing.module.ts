import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
const routes: Routes = [
  // {
  //   path: 'view-rri/:id',
  //   component: ViewRRIComponent,
  //   data: {
  //     title: 'Rapid Result Initiative [RRI] / Projects',
  //     permissions: {
  //       only: ['USER_MANAGER','VIEWER'],
  //       redirectTo: '/500'
  //     }
  //   },
  //   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  // },
  // {
  //   path: 'evaluation',
  //   component: EvaluationComponent,
  //   data: {
  //     title: 'Evaluation',
  //     permissions: {
  //       only: ['USER_MANAGER','VIEWER','EVALUATOR'],
  //       redirectTo: '/500'
  //     }
  //   },
  //   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericsRoutingModule { }
