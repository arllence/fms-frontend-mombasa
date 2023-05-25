
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../services/administration.service';
import { list_departments, list_user_roles, create_user_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { color } from 'highcharts';

@Component({
  selector: 'app-staffregistration',
  templateUrl: './staffregistration.component.html',
  styleUrls: ['./staffregistration.component.css']
})

export class StaffregistrationComponent {
  user_roles_list: [] = [];
  department_list: [] = [];
  registerForm: FormGroup;
  fileData: File;
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService, private formBuilder: FormBuilder,) {

      this.registerForm = this.formBuilder.group({
        username: new FormControl('',Validators.compose([Validators.required])),  
        first_name: new FormControl('',Validators.compose([Validators.required])),  
        last_name: new FormControl('',Validators.compose([Validators.required])),  
        email: new FormControl('',Validators.compose([Validators.required])),  
        id_number: new FormControl('',Validators.compose([Validators.required])),    
        phone_number: new FormControl('',Validators.compose([Validators.required])),       
        role_name: new FormControl('',Validators.compose([Validators.required])),         
        department_id: new FormControl('',Validators.compose([Validators.required])),         
      });

  }
  ngOnInit() {
    this.fetchalldepartments();
    this.fetchallroles();

  }
  ngAfterViewInit() {
    
    
    this.populateform();
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
handleFileupload(e:any) {
  this.fileData = e.target.files[0];
}
  registeruser() {
    const payload = this.registerForm.value;
    const formData  =  new FormData();
    formData.append('document', this.fileData);
    formData.append('payload', JSON.stringify(payload));
    
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_user_url, formData).subscribe((res) => {
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

  populateform() {
      const new_config = [
        {
          field_type: 'input',
          label: 'Username',
          input_type: 'text',
          name: 'username',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Username is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'ID Number',
          input_type: 'number',
          name: 'id_number',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'ID Number is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'First Name',
          input_type: 'text',
          name: 'first_name',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'First Name is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Last Name',
          input_type: 'text',
          name: 'last_name',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Last Name is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Email',
          input_type: 'email',
          name: 'email',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Email is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Phone Number',
          input_type: 'text',
          name: 'phone_number',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Phone Number is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Id Card',
          input_type: 'file',
          name: 'id_card',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'ID Card is Required'
            }
          ]
        },
        {
          field_type: 'select',
          label: 'User Role',
          name: 'role_name',
          width: 6,
          options: this.user_roles_list,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: ' Role is Required'
            }
          ]
        },
        {
          field_type: 'select',
          label: 'Department',
          width: 6,
          name: 'department_id',
          options: this.department_list,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Department is Required'
            }
          ]
        },
        {
          field_type: 'button',
          width: 6,
          label: 'Save'
        }
      ];




    // this.inputForm.resetForm();


}
}

