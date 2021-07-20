import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { City } from 'src/app/models/city';
import { DailyForecasts } from 'src/app/models/daily-forecasts';
import { DenormalizedCity } from 'src/app/models/denormalizedCity';
import { AccuweatherService } from 'src/app/services/accuweather.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'weather-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  public citiesList: DenormalizedCity[] = [];
  public cuurentCity: City;
  public fiveDaysForecasts: DailyForecasts[];
  public showAutocomplete: boolean = false;
  public isFavorites: boolean = false;
  public cityLoader: boolean = false;

  private defaultCity: DenormalizedCity = {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
      "ID": "IL",
      "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
      "ID": "TA",
      "LocalizedName": "Tel Aviv"
    }
  }

  constructor(private fb: FormBuilder, private accuweatherService: AccuweatherService, private favoritesService: FavoritesService,
    private router: Router, private toastService: ToastService) {
    this.form = fb.group({
      autocomplete: ['']
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const a = this.router?.getCurrentNavigation()?.extras?.state?.CityDetails;
        if (a) {
          this.pickCity(a)
        }
      }
    });

    this.pickCity(this.defaultCity)

    this.form.get('autocomplete').valueChanges
      .pipe(debounceTime(400))
      .subscribe(value => {
        this.cityLoader = true;
        if (!value.length)
          this.showAutocomplete = false;
        else
          this.getCities(value);
      });

    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude.toString();
        const lng = position.coords.longitude.toString();
        this.accuweatherService.getCityByLocation(lat, lng)
          .then((res: any) => {
            const city: DenormalizedCity = {
              AdministrativeArea: null,
              Country: null,
              Key: res.Key,
              LocalizedName: res.LocalizedName,
              Rank: res.Rank,
              Type: null,
              Version: res.Version
            }
            this.pickCity(city);
          })
          .catch(err => {
            this.toastService.setText({
              show: true,
              type: 'danger',
              text: err.Message || 'Server Error'
            })
          })
      });
    }
  }

  getFiveDaysForecasts(cityId: string) {
    this.accuweatherService.getFiveDaysForecasts(cityId)
      .then((res: any) => {
        this.fiveDaysForecasts = res.DailyForecasts;
      })
      .catch(err => {
        this.toastService.setText({
          show: true,
          type: 'danger',
          text: err.Message || 'Server Error'
        })
      });;
  }

  getCities(searchTerm: string) {
    this.accuweatherService.getCities(searchTerm)
      .then((res: any) => {
        this.citiesList = [...res];
      })
      .catch(err => {
        this.toastService.setText({
          show: true,
          type: 'danger',
          text: err.Message || 'Server Error'
        });
      })
      .finally(() => {
        this.cityLoader = false;
        if (this.citiesList?.length) {
          this.showAutocomplete = true;
        }
        else {
          this.toastService.setText({
            show: true,
            type: 'danger',
            text: 'City not found!'
          });
        }
      });
  }

  pickCity(city: DenormalizedCity) {
    this.showAutocomplete = false;
    this.getFiveDaysForecasts(city?.Key);

    this.accuweatherService.getCity(city.Key, { details: true })
      .then((res: City) => {
        this.cuurentCity = res[0];
        this.cuurentCity.CityDetails = city;
        this.getFiveDaysForecasts(city?.Key);
        this.isFavorites = this.favoritesService.isFavorite({ Key: this.cuurentCity.CityDetails.Key, Name: this.cuurentCity.CityDetails.LocalizedName });
      })
      .catch(err => {
        this.toastService.setText({
          show: true,
          type: 'danger',
          text: err.Message || 'Server Error'
        });
      });

  }

  favorites() {
    if (this.isFavorites) {
      this.favoritesService.removeFromFavorites(this.cuurentCity);
      this.toastService.setText({
        show: true,
        type: 'danger',
        text: `You removed ${this.cuurentCity?.CityDetails?.LocalizedName || 'city'} to favorites`
      });
    }
    else {
      this.favoritesService.addToFavorite(this.cuurentCity);
      this.toastService.setText({
        show: true,
        type: 'success',
        text: `You added ${this.cuurentCity?.CityDetails?.LocalizedName || 'city'} to favorites`
      });
    }
    this.isFavorites = !this.isFavorites
  }
}
