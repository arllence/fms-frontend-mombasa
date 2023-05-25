import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(public datepipe: DatePipe) { }
  convertDate(inputdate:any){
    let formatted_date =this.datepipe.transform(inputdate, 'yyyy-MM-dd HH:mm:ss');
    return formatted_date
  }
}
