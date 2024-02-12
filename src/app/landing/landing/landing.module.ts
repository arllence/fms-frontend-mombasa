import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonSharedModule,
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
