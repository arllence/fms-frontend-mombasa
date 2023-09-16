import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { SectorComponent } from '../../sector/sector.component';
import { TitleComponent } from '../../title/title.component';
import { WavesComponent } from '../../waves/waves.component';
import { ThematicAreasComponent } from '../../thematic-areas/thematic-areas.component';
import { RRIGoalsComponent } from '../../rri-goals/rri-goals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModulee } from '../../../common-module/common-module/common-module.module';

import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { TeamMembersComponent } from '../../team-members/team.component';
import { BoroughsComponent } from '../../boroughs/main.component';
import { SubCountyComponent } from '../../sub-counties/main.component';
import { WardComponent } from '../../wards/main.component';
import { EstateComponent } from '../../estates/main.component';

@NgModule({
  declarations: [
    StaffregistrationComponent,
    StafflistingComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    SectorComponent,
    TitleComponent,
    ThematicAreasComponent,
    RRIGoalsComponent,
    WavesComponent,
    TeamMembersComponent,
    BoroughsComponent,
    SubCountyComponent,
    WardComponent,
    EstateComponent
  ],
  imports: [
    SharedModulee,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
