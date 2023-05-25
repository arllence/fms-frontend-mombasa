import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
