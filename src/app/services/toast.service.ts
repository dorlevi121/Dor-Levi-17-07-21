import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastDetails {
  show: boolean;
  text?: string;
  type?: 'success' | 'danger'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastDetails: BehaviorSubject<ToastDetails> = new BehaviorSubject({ show: false });

  constructor() {    
  }

  setText(details: ToastDetails) {
    this.toastDetails.next(details);
   if(details.show) {
      setTimeout(() => {
        this.toastDetails.next({show: false});
      }, 5000)
    }
  }
}