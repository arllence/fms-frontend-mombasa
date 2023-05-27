import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { SharedModulee } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModulee,
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
