import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';

import { ChangePasswordGuard } from '../../../authentication/guards/change-password.guard';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { SectorComponent } from '../../sector/sector.component';
import { TitleComponent } from '../../title/title.component';
import { ThematicAreasComponent } from '../../thematic-areas/thematic-areas.component';
import { RRIGoalsComponent } from '../../rri-goals/rri-goals.component';
const routes: Routes = [

  {
    path: 'staff-registration',
    component: StaffregistrationComponent,
    data: {
      title: 'Staff Registration',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'staff-listing',
    component: StafflistingComponent,
    data: {
      title: 'Staff Listing',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'staff-details/:id',
    component: StaffDetailsComponent,
    data: {
      title: 'Staff Details',
      permissions: {
        only: ['USER_MANAGER', 'TEAM_LEADER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'department-listing',
    component: DepartmentListingComponent,
    data: {
      title: 'Department Listing',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'sector-listing',
    component: SectorComponent,
    data: {
      title: 'Sector Listing',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'title-listing',
    component: TitleComponent,
    data: {
      title: 'Title Listing',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'thematic-area',
    component: ThematicAreasComponent,
    data: {
      title: 'Thematic Areas',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'rri-goals',
    component: RRIGoalsComponent,
    data: {
      title: 'RRI Goal',
      permissions: {
        only: ['USER_MANAGER'],
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
export class AdministrationRoutingModule { }
