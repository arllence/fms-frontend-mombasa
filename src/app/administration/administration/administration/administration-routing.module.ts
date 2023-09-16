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
import { WavesComponent } from '../../waves/waves.component';
import { TeamMembersComponent } from '../../team-members/team.component';
import { BoroughsComponent } from '../../boroughs/main.component';
import { SubCountyComponent } from '../../sub-counties/main.component';
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
      title: 'Departments',
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
      title: 'Sectors',
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
      title: 'Roles',
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
      title: 'RRI Goals',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'waves',
    component: WavesComponent,
    data: {
      title: 'Waves',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'team-members',
    component: TeamMembersComponent,
    data: {
      title: 'Waves',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'boroughs',
    component: BoroughsComponent,
    data: {
      title: 'Boroughs',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'sub-counties',
    component: SubCountyComponent,
    data: {
      title: 'Sub-Counties',
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
