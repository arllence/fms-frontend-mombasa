
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../services/administration.service';
import { list_departments, list_user_roles, create_user_url, title_url, overseer_url, thematic_area_url, team_members_url, bulk_create_user_url} from '../../app.constants';
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
  }
  ngAfterViewInit() {
  
  }

back_btn(){
  this.router.navigate([this.previous]);
}


 fetchallroles() {
   const payload = {
   };
   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
     for (const record of res) {
      this.user_roles_list.push(record);
     }
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

  


}

