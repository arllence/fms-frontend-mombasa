import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { CommonProfileComponent } from './containers/common-profile/common-profile.component';
import { CommonProfileUpdateComponent } from './containers/common-profile-update/common-profile-update.component';
import { AuthenticationGuard } from './authentication/guards/authguard.guard';
import { ChangePasswordGuard } from './authentication/guards/change-password.guard';
import { UpdateProfileGuard } from './authentication/guards/update-profile.guard';

const routes: Routes = [

  {  
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication/authentication.module').then(m => m.AuthenticationModule
    )
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        component: CommonProfileComponent,
        data: {
          title: 'Profile Details'
        }
      },
      
      {
        path: 'update-profile',
        component: CommonProfileUpdateComponent,
        data: {
          title: 'Profile Update'
        }
      },
      {
        path: 'landing',
        loadChildren:
        () => import('./landing/landing/landing.module').then(m => m.LandingModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'administration',
        loadChildren:
        () => import('./administration/administration/administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'generics',
        loadChildren:
        () => import('./generics/config/generics.module').then(m => m.GenericsModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'requests',
        loadChildren:
        () => import('./requests/config/main.module').then(m => m.MainModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'reports',
        loadChildren:
        () => import('./reports/config/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', component:  Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes
      , {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
