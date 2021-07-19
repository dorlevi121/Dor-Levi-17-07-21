import { Component, Input, OnInit } from '@angular/core';
import { ToastDetails, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'weather-app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() popupDetails: ToastDetails;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }

  close() {
    this.toastService.setText({ show: false });
  }
}
