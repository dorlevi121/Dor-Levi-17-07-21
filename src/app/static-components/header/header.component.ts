import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'weather-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnInit {

  public temperatureType: 'c' | 'f';
  private $temperatureType: Subscription;

  public isDarkMode: boolean;
  private $isDarkMode: Subscription;

  constructor(private elementRef: ElementRef, private settingService: SettingsService) { }

  ngOnInit(): void {
    this.$temperatureType = this.settingService.temperatureTypeSubscription
      .subscribe(type => {
        this.temperatureType = type;
      });

    this.$isDarkMode = this.settingService.isDarkModeubscription
      .subscribe(mode => {
        this.isDarkMode = mode;
        // if (this.isDarkMode)
        //   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '';
        // else
        //   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1e202b';
      })
  }

  setTemperatureType(type: 'c' | 'f') {
    this.settingService.setTemperatureType(type);
  }

  setDarkMode() {
    this.settingService.setDarkMode(!this.isDarkMode);
  }

  ngOnDestroy(): void {
    if (this.$temperatureType)
      this.$temperatureType.unsubscribe();
    if (this.$isDarkMode)
      this.$isDarkMode.unsubscribe();
  }

}
