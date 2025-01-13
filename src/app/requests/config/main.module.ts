import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ViewRequestsComponent } from '../container/view/main.component';
import { DetailRequestComponent } from '../container/detail/main.component';
import { RcaDetailRequestComponent } from '../container/rca/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    ViewRequestsComponent,
    DetailRequestComponent,
    RcaDetailRequestComponent,
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
