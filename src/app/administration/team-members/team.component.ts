
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../services/administration.service';
import { list_departments, list_user_roles, create_user_url, title_url, overseer_url, thematic_area_url, team_members_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { color } from 'highcharts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamMembersComponent {
  user_roles_list: [] = [];
  department_list: [] = [];
  teamMemberForm: FormGroup;
  fileData: File;
  is_system_user: boolean = false;
  is_overseer_user: boolean = false;
  titles: [] = [];
  thematic_areas: [] = [];
  is_team_member: boolean = true;
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService, private formBuilder: FormBuilder,) {

      this.teamMemberForm = this.formBuilder.group({ 
        member: new FormControl('',Validators.compose([Validators.required])),  
        thematic_area: new FormControl('',Validators.compose([Validators.required])),      
      });

  }
  ngOnInit() {
    // this.fetchalldepartments();
    // this.fetchallroles();
    // this.fetchTitles();
    this.fetchThematicAreas();

  }
  ngAfterViewInit() {
  
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

  fetchThematicAreas() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(thematic_area_url, params).subscribe((res) => {
      this.thematic_areas = res;
      this.loadingService.hideloading();
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

