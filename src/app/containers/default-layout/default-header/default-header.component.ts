import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { SweetalertService} from '../../../common-module/shared-service/sweetalerts.service';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  loggedinusername: any;
  department_name: any;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private router: Router,private classToggler: ClassToggleService,
    public authService: AuthenticationService, public sweetalertService: SweetalertService) {
    super();
    this.fetchuserDetails();
  }
  fetchuserDetails() {
    this.authService.getuserprofileInfo().then((res:any) => {

      this.loggedinusername = res['currentusername'];
      this.department_name = res['department_name'];
    });
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
