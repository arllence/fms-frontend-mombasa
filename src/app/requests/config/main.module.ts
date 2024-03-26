import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuoteComponent } from '../container/create/main.component';
import { ViewRequestsComponent } from '../container/view/main.component';
import { DetailRequestComponent } from '../container/detail/main.component';
import { ViewSalaryRequestsComponent } from '../container/salary/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    QuoteComponent,
    ViewRequestsComponent,
    DetailRequestComponent,
    ViewSalaryRequestsComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
