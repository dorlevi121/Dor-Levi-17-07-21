import { Component, OnInit } from '@angular/core';
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

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.$temperatureType = this.settingService.temperatureTypeSubscription
      .subscribe(type => {
        this.temperatureType = type;
      })
  }

  setTemperatureType(type: 'c' | 'f') {
    this.settingService.setTemperatureType(type);
  }

  ngOnDestroy(): void {
    if (this.$temperatureType)
      this.$temperatureType.unsubscribe()
  }

}
