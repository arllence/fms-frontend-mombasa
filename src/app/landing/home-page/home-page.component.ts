import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  general_analytics_url,
  list_notifications_url, rri_goals_url
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common-module/shared-service/toast.service';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
all_notices:any;
public createRecordForm: FormGroup;
public FilterForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  fileData: File;
  fileDatas = [];
  myFiles: string[] = [];
  generals:any;
  previous: string | null;
  activate_date_range = false;




  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) { 
    this.createRecordForm = this.formBuilder.group({
      thematic_area_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });
    this.FilterForm = this.formBuilder.group({
      accountType: new FormControl('', ),
      range_start_date: new FormControl('', ),
      range_end_date: new FormControl('', ),
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
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

  ngOnInit(): void  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      processing: true,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
      ]
    };
    this.fetch_general_analytics()
  }

  fetch_general_analytics() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(general_analytics_url, params).subscribe((res) => {
      this.generals = res;
      this.loadingService.hideloading();

    });
  }

  view_rri(id:any){
    this.router.navigate(['/generics/view-rri', id]);
  }



  get_todays_date() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = today.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  goto_projects(){
    this.router.navigate(['/administration/waves']);
  }
  goto_objectives(){
    this.router.navigate(['/administration/rri-goals']);
  }
  goto_goals(){
    this.router.navigate(['/administration/thematic-area']);
  }

}
