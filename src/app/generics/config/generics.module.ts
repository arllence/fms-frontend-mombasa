import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
