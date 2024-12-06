import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { HomeComponent } from '../container/home/main.component';
import { IncidentRequestComponent } from '../container/incident/main.component';

@NgModule({
  declarations: [
    HomeComponent,
    IncidentRequestComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
