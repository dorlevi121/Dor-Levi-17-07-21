import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Pipe({
  name: 'temperatureType'
})
export class TemperatureTypePipe implements PipeTransform {

  constructor(private settingsService: SettingsService) { }

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    
    const type = this.settingsService.getTemperatureType();
    if(type === 'f') {
      return this.cToF(value);
    }    
    return value;
  }

  private cToF(celsius) {
    let cTemp = celsius;
    let cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr.toFixed();
  }

}
