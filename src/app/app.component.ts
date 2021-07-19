import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from './services/settings.service';
import { ToastDetails, ToastService } from './services/toast.service';

@Component({
  selector: 'weather-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isDarkMode: boolean;
  private $isDarkMode: Subscription;

  public toastDetails: ToastDetails
  private $toastDetails: Subscription;

  constructor(private elementRef: ElementRef, private settingService: SettingsService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.$isDarkMode = this.settingService.isDarkModeubscription
      .subscribe(mode => {
        this.isDarkMode = mode;
        if (this.isDarkMode) {
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8C8D93';
          this.elementRef.nativeElement.ownerDocument.body.style.color = 'black';
        }
        else
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1e202b';
      });

    this.$toastDetails = this.toastService.toastDetails.subscribe(details => {
      this.toastDetails = details;
    });
  }
  ngOnDestroy(): void {
    if (this.$isDarkMode)
      this.$isDarkMode.unsubscribe();
    if (this.$toastDetails)
      this.$toastDetails.unsubscribe();
  }

}
