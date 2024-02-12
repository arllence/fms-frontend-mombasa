import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent  } from '../login/login.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonSharedModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
})
export class AuthenticationModule { }
