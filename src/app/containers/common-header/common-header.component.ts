import {Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  public sidebarMinimized = false;
  loggedinusername: any;
  department_name: any;

  constructor(private router: Router, public authService: AuthenticationService, public sweetalertService: SweetalertService) {

this.fetchuserDetails();

  }
  // fetchuserDetails(){
  //   this.authService.getUserDetails().then((res)=>{

  //     this.loggedinusername = res;
  //   });
  // }
  fetchuserDetails() {
    this.authService.getuserprofileInfo().then((res:any) => {

      this.loggedinusername = res['currentusername'];
      this.department_name = res['department_name'];
    });
  }



  toggleMinimize(e:any) {
    this.sidebarMinimized = e;
  }
  changepassword() {

    this.router.navigate(['profile']);


  }
  logout() {
    this.sweetalertService.showConfirmation('Logout', 'Do you wish to proceed logging out?').then((res) => {
      if (res) {
        this.authService.logout();
      }

    });



  }
}
