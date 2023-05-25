import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  modal = new Subject();

    getModal() {
        return this.modal;
    }
    openModal() {
      this.modal.next(true);
  }
  
  closeModal() {
    this.modal.next(false);
  }
}

