import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
// Import routing module
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
// Import app component
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptors';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';


import { CommonSidebarComponent } from './containers/common-sidebar/common-sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SafePipe } from './safepipe';
export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

import { NgxPermissionsModule } from 'ngx-permissions';


import { SharedModulee } from './common-module/common-module/common-module.module';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SpinnerModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, 
    ...APP_CONTAINERS,
    CommonSidebarComponent ,
    Page404Component ,
    Page500Component ,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule ,
    DropdownModule,
    GridModule,
    SharedModulee ,
    HeaderModule,
    NgSelectModule,
    SidebarModule,
    SpinnerModule,
    // ToastrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BsDropdownModule.forRoot(),
    IconModule,
    PerfectScrollbarModule,
    NgxPermissionsModule.forRoot(),
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://39d27368.ngrok.io']
      }
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // IconSetService,
    // Title
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
}
