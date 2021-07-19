import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'weather-app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  @Input() city: City;

  public temperatureType: 'c' | 'f';
  private $temperatureType: Subscription;

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.$temperatureType = this.settingService.temperatureTypeSubscription
      .subscribe(type => {
        this.temperatureType = type;
      });
  }

  cToF(celsius: number) {
    let cTemp = celsius;
    let cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr.toFixed();
  }

  ngOnDestroy(): void {
    if (this.$temperatureType)
      this.$temperatureType.unsubscribe()
  }

}
