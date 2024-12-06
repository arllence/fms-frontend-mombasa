import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { LocumAttendanceComponent } from '../container/locum-attendance/main.component';
import { HomeComponent } from '../container/home/main.component';

@NgModule({
  declarations: [
    LocumAttendanceComponent,
    HomeComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
