import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from '../container/create/main.component';
import { ViewQuoteComponent } from '../container/view/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    QuoteComponent,
    ViewQuoteComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    QuoteRoutingModule
  ]
})
export class QuoteModule { }
