import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { GoalReviewComponent } from '../container/goal-review/review.component';
const routes: Routes = [

  {
    path: 'goal-review/:goal_id',
    component: GoalReviewComponent,
    data: {
      title: 'Progress Report',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
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
