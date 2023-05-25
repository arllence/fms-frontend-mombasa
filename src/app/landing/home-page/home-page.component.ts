import { Component, OnInit } from '@angular/core';
import {
  list_notifications_url
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
all_notices:any;
  constructor(public administrationService: AdministrationService,public loadingService:LoadingService) { }

  ngOnInit() {
    this.fetch_notices();
  }
fetch_notices(){
  let payload = {};
  this.loadingService.showloading();
  this.administrationService.getrecords(list_notifications_url,payload).subscribe((res)=>{
    this.all_notices = res;
    this.loadingService.hideloading();
  });
}
}
