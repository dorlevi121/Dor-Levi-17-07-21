import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherService {

  constructor(private api: ApiService) { }

  getCities(searchTerm: string) {
    return this.api.get('locations/v1/cities/autocomplete/', { q: searchTerm }).toPromise();
  }

  getCity(cityId: string, params: {} = {}) {
    return this.api.get('currentconditions/v1/' + cityId, params).toPromise();
  }

  getFiveDaysForecasts(cityId: string) {
    return this.api.get('forecasts/v1/daily/5day/' + cityId, { metric: true }).toPromise();
  }

  getCityByLocation(lat: string, lng: string) {
    const location = lat + ',' + lng;
    return this.api.get('locations/v1/cities/geoposition/search/', { q: location }).toPromise();
  }
}
