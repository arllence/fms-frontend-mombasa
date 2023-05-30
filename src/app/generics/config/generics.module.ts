import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { SharedModulee } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    ViewRRIComponent
  ],
  imports: [
    SharedModulee,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
