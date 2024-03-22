import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuoteComponent } from '../container/create/main.component';
import { ViewQuoteComponent } from '../container/view/main.component';
import { DetailViewQuoteComponent } from '../container/detail/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    QuoteComponent,
    ViewQuoteComponent,
    DetailViewQuoteComponent,
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
