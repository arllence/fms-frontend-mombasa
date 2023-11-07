
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../services/administration.service';
import { list_departments, list_user_roles, create_user_url, title_url, overseer_url, thematic_area_url, team_members_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { color } from 'highcharts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffregistration',
  templateUrl: './staffregistration.component.html',
  styleUrls: ['./staffregistration.component.css']
})

export class StaffregistrationComponent {
  user_roles_list: [] = [];
  department_list: [] = [];
  registerForm: FormGroup;
  overseerForm: FormGroup;
  teamMemberForm: FormGroup;
  fileData: File;
  is_system_user: boolean = false;
  is_overseer_user: boolean = false;
  titles: [] = [];
  thematic_areas: [] = [];
  is_team_member: boolean = false;
  previous: string | null;
  selection: any = '';
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService, private formBuilder: FormBuilder,  private router: Router) {

      this.registerForm = this.formBuilder.group({ 
        first_name: new FormControl('',Validators.compose([Validators.required])),  
        last_name: new FormControl('',Validators.compose([Validators.required])),  
        email: new FormControl('',Validators.compose([Validators.required])),        
        role_name: new FormControl('',Validators.compose([Validators.required])),         
        department_id: new FormControl('',Validators.compose([Validators.required])),         
      });
      this.overseerForm = this.formBuilder.group({ 
        name: new FormControl('',Validators.compose([Validators.required])),  
        contact: new FormControl('N/A',),  
        title: new FormControl('',Validators.compose([Validators.required]))     
      });
      this.teamMemberForm = this.formBuilder.group({ 
        member: new FormControl('',Validators.compose([Validators.required])),  
        thematic_area: new FormControl('',Validators.compose([Validators.required])),      
      });

      // BACK BUTTON
    let current_url = String(window.location.pathname )
    const current = localStorage.getItem('current');
    this.previous = current;
    if (current){
      localStorage.setItem('previous',current)
      localStorage.setItem('current',current_url)
    } else {
      localStorage.setItem('current',current_url)
    }

  }
  ngOnInit() {
    this.fetchalldepartments();
    this.fetchallroles();
    this.fetchTitles();
    this.fetchThematicAreas();

  }
  ngAfterViewInit() {
  
}

back_btn(){
  this.router.navigate([this.previous]);
}
set_is_system_user(){
  this.is_system_user = !this.is_system_user
}
set_is_overseer_user(){
  this.is_overseer_user = !this.is_overseer_user
}
set_is_team_member(){
  this.is_team_member = !this.is_team_member
}
select_user_type(selection:any){
  this.selection = selection
}

 fetchallroles() {
   const payload = {
   };
   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
     for (const record of res) {
      this.user_roles_list.push(record);
     }
     console.log(this.department_list);



   });

 }
 fetchalldepartments() {
  const payload = {
  };
  this.administrationService.getrecords(list_departments, payload).subscribe((res) => {
    for (const record of res) {
      this.department_list.push(record);
     }

  });
}
fetchTitles() {
  this.loadingService.showloading();
  const params = {

  };
  this.administrationService.getrecords(title_url, params).subscribe((res) => {
    this.titles = res;
    // this.dtTrigger.next()
    this.loadingService.hideloading();

  });
}
fetchThematicAreas() {
  this.loadingService.showloading();
  const params = {

  };
  this.administrationService.getrecords(thematic_area_url, params).subscribe((res) => {
    this.thematic_areas = res;
    this.loadingService.hideloading();
  });
}
handleFileupload(e:any) {
  this.fileData = e.target.files[0];
}
  registeruser() {
    const payload = this.registerForm.value;
    
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_user_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','User Created Successfully','success');
            this.registerForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }

  registeroverseer() {
    const payload = this.overseerForm.value;
    
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(overseer_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','User Created Successfully','success');
            this.overseerForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }

  registerTeamMember() {
    const payload = this.teamMemberForm.value;
    
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(team_members_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','User Created Successfully','success');
            this.teamMemberForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }


}

