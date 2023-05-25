import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.css']
})
export class CommonFooterComponent implements OnInit {

  
  date: Date = new Date();  
  year =  this.date.getFullYear();
  // console.log(year)

  constructor() { }

  ngOnInit(): void {
  }

}
