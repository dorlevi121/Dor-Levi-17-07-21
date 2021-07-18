import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { DailyForecasts } from 'src/app/models/daily-forecasts';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'weather-app-days-forecasts',
  templateUrl: './days-forecasts.component.html',
  styleUrls: ['./days-forecasts.component.scss']
})
export class DaysForecastsComponent implements OnInit, OnDestroy {

  @Input() fourDaysForecasts: DailyForecasts[];
  @Input() city: City;

  public temperatureType: 'c' | 'f';
  private $temperatureType: Subscription;

  private weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.$temperatureType = this.settingService.temperatureTypeSubscription
      .subscribe(type => {
        this.temperatureType = type;
      })
  }

  getDayName(dateString: string) {
    const dayNumber = new Date(dateString).getDay();
    return this.weekday[dayNumber]
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
