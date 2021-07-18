import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { City } from 'src/app/models/city';
import { DailyForecasts } from 'src/app/models/daily-forecasts';
import { DenormalizedCity } from 'src/app/models/denormalizedCity';
import { AccuweatherService } from 'src/app/services/accuweather.service';
import { FavoritesService } from 'src/app/services/favorites.service';

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

  constructor(private fb: FormBuilder, private accuweatherService: AccuweatherService, private favoritesService: FavoritesService) {
    this.form = fb.group({
      autocomplete: ['']
    });
  }

  ngOnInit(): void {
    this.pickCity(this.defaultCity)
    this.form.get('autocomplete').valueChanges
      .pipe(debounceTime(400))
      .subscribe(value => {
        if (!value.length) {
          this.showAutocomplete = false;
        }
        else {
          this.getCities(value);
        }
      });
    // this.getCities('2')
    // this.getUserLocation()
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
      });
    }
  }

  getFiveDaysForecasts(cityId: string) {
    this.fiveDaysForecasts = [
      {
        "Date": "2021-07-17T07:00:00+03:00",
        "EpochDate": 1626494400,
        "Temperature": {
          "Minimum": {
            "Value": 25.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 32.8,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 33,
          "IconPhrase": "Clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
      },
      {
        "Date": "2021-07-18T07:00:00+03:00",
        "EpochDate": 1626580800,
        "Temperature": {
          "Minimum": {
            "Value": 26.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 32.8,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
      },
      {
        "Date": "2021-07-19T07:00:00+03:00",
        "EpochDate": 1626667200,
        "Temperature": {
          "Minimum": {
            "Value": 27,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 33.1,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
      },
      {
        "Date": "2021-07-20T07:00:00+03:00",
        "EpochDate": 1626753600,
        "Temperature": {
          "Minimum": {
            "Value": 26,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 31.9,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 33,
          "IconPhrase": "Clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
      },
      {
        "Date": "2021-07-21T07:00:00+03:00",
        "EpochDate": 1626840000,
        "Temperature": {
          "Minimum": {
            "Value": 25.7,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 31.5,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 35,
          "IconPhrase": "Partly cloudy",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
      }
    ]
    // this.accuweatherService.getFiveDaysForecasts(cityId)
    //   .then((res: any) => {
    //     this.fiveDaysForecasts = res.DailyForecasts;
    //   });
  }

  getCities(searchTerm: string) {
    this.citiesList =
      [
        {
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
        },
        {
          "Version": 1,
          "Key": "3431644",
          "Type": "City",
          "Rank": 45,
          "LocalizedName": "Telanaipura",
          "Country": {
            "ID": "ID",
            "LocalizedName": "Indonesia"
          },
          "AdministrativeArea": {
            "ID": "JA",
            "LocalizedName": "Jambi"
          }
        },
        {
          "Version": 1,
          "Key": "300558",
          "Type": "City",
          "Rank": 45,
          "LocalizedName": "Telok Blangah New Town",
          "Country": {
            "ID": "SG",
            "LocalizedName": "Singapore"
          },
          "AdministrativeArea": {
            "ID": "05",
            "LocalizedName": "South West"
          }
        },
        {
          "Version": 1,
          "Key": "325876",
          "Type": "City",
          "Rank": 51,
          "LocalizedName": "Telford",
          "Country": {
            "ID": "GB",
            "LocalizedName": "United Kingdom"
          },
          "AdministrativeArea": {
            "ID": "TFW",
            "LocalizedName": "Telford and Wrekin"
          }
        },
        {
          "Version": 1,
          "Key": "169072",
          "Type": "City",
          "Rank": 51,
          "LocalizedName": "Telavi",
          "Country": {
            "ID": "GE",
            "LocalizedName": "Georgia"
          },
          "AdministrativeArea": {
            "ID": "KA",
            "LocalizedName": "Kakheti"
          }
        },
        {
          "Version": 1,
          "Key": "230611",
          "Type": "City",
          "Rank": 51,
          "LocalizedName": "Telsiai",
          "Country": {
            "ID": "LT",
            "LocalizedName": "Lithuania"
          },
          "AdministrativeArea": {
            "ID": "TE",
            "LocalizedName": "Telšiai"
          }
        },
        {
          "Version": 1,
          "Key": "2723742",
          "Type": "City",
          "Rank": 55,
          "LocalizedName": "Telégrafo",
          "Country": {
            "ID": "BR",
            "LocalizedName": "Brazil"
          },
          "AdministrativeArea": {
            "ID": "PA",
            "LocalizedName": "Pará"
          }
        },
        {
          "Version": 1,
          "Key": "186933",
          "Type": "City",
          "Rank": 55,
          "LocalizedName": "Tela",
          "Country": {
            "ID": "HN",
            "LocalizedName": "Honduras"
          },
          "AdministrativeArea": {
            "ID": "AT",
            "LocalizedName": "Atlántida"
          }
        },
        {
          "Version": 1,
          "Key": "3453754",
          "Type": "City",
          "Rank": 55,
          "LocalizedName": "Telaga Asih",
          "Country": {
            "ID": "ID",
            "LocalizedName": "Indonesia"
          },
          "AdministrativeArea": {
            "ID": "JB",
            "LocalizedName": "West Java"
          }
        },
        {
          "Version": 1,
          "Key": "3453755",
          "Type": "City",
          "Rank": 55,
          "LocalizedName": "Telagamurni",
          "Country": {
            "ID": "ID",
            "LocalizedName": "Indonesia"
          },
          "AdministrativeArea": {
            "ID": "JB",
            "LocalizedName": "West Java"
          }
        }
      ]
    // this.accuweatherService.getCities(searchTerm)
    //   .then((res: any) => {
    //     this.citiesList = [...res];
    //   });
    if (this.citiesList?.length) {
      this.showAutocomplete = true;
    }
  }

  pickCity(city: DenormalizedCity) {
    this.showAutocomplete = false;
    this.cuurentCity = {
      "LocalObservationDateTime": "2021-07-18T01:01:00+03:00",
      "EpochTime": 1626559260,
      "WeatherText": "Clear",
      "WeatherIcon": 33,
      "HasPrecipitation": false,
      "PrecipitationType": null,
      "IsDayTime": false,
      "Temperature": {
        "Metric": {
          "Value": 27.8,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 82,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "RealFeelTemperature": {
        "Metric": {
          "Value": 28.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 83,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "RealFeelTemperatureShade": {
        "Metric": {
          "Value": 28.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 83,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "RelativeHumidity": 59,
      "IndoorRelativeHumidity": 59,
      "DewPoint": {
        "Metric": {
          "Value": 19.1,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 66,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "Wind": {
        "Direction": {
          "Degrees": 0,
          "Localized": "N",
          "English": "N"
        },
        "Speed": {
          "Metric": {
            "Value": 6.1,
            "Unit": "km/h",
            "UnitType": 7
          },
          "Imperial": {
            "Value": 3.8,
            "Unit": "mi/h",
            "UnitType": 9
          }
        }
      },
      "WindGust": {
        "Speed": {
          "Metric": {
            "Value": 9,
            "Unit": "km/h",
            "UnitType": 7
          },
          "Imperial": {
            "Value": 5.6,
            "Unit": "mi/h",
            "UnitType": 9
          }
        }
      },
      "UVIndex": 0,
      "UVIndexText": "Low",
      "Visibility": {
        "Metric": {
          "Value": 16.1,
          "Unit": "km",
          "UnitType": 6
        },
        "Imperial": {
          "Value": 10,
          "Unit": "mi",
          "UnitType": 2
        }
      },
      "ObstructionsToVisibility": "",
      "CloudCover": 0,
      "Ceiling": {
        "Metric": {
          "Value": 10180,
          "Unit": "m",
          "UnitType": 5
        },
        "Imperial": {
          "Value": 33400,
          "Unit": "ft",
          "UnitType": 0
        }
      },
      "Pressure": {
        "Metric": {
          "Value": 1005.1,
          "Unit": "mb",
          "UnitType": 14
        },
        "Imperial": {
          "Value": 29.68,
          "Unit": "inHg",
          "UnitType": 12
        }
      },
      "PressureTendency": {
        "LocalizedText": "Steady",
        "Code": "S"
      },
      "Past24HourTemperatureDeparture": {
        "Metric": {
          "Value": 0.6,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 1,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "ApparentTemperature": {
        "Metric": {
          "Value": 29.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 85,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "WindChillTemperature": {
        "Metric": {
          "Value": 27.8,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 82,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "WetBulbTemperature": {
        "Metric": {
          "Value": 22,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 72,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "Precip1hr": {
        "Metric": {
          "Value": 0,
          "Unit": "mm",
          "UnitType": 3
        },
        "Imperial": {
          "Value": 0,
          "Unit": "in",
          "UnitType": 1
        }
      },
      "PrecipitationSummary": {
        "Precipitation": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "PastHour": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past3Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past6Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past9Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past12Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past18Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        },
        "Past24Hours": {
          "Metric": {
            "Value": 0,
            "Unit": "mm",
            "UnitType": 3
          },
          "Imperial": {
            "Value": 0,
            "Unit": "in",
            "UnitType": 1
          }
        }
      },
      "TemperatureSummary": {
        "Past6HourRange": {
          "Minimum": {
            "Metric": {
              "Value": 27.8,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 82,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Maximum": {
            "Metric": {
              "Value": 30.8,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 87,
              "Unit": "F",
              "UnitType": 18
            }
          }
        },
        "Past12HourRange": {
          "Minimum": {
            "Metric": {
              "Value": 27.8,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 82,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Maximum": {
            "Metric": {
              "Value": 32.8,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 91,
              "Unit": "F",
              "UnitType": 18
            }
          }
        },
        "Past24HourRange": {
          "Minimum": {
            "Metric": {
              "Value": 25.5,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 78,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Maximum": {
            "Metric": {
              "Value": 32.8,
              "Unit": "C",
              "UnitType": 17
            },
            "Imperial": {
              "Value": 91,
              "Unit": "F",
              "UnitType": 18
            }
          }
        }
      },
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      CityDetails: city
    }
    this.getFiveDaysForecasts(city?.Key);
    this.isFavorites = this.favoritesService.isFavorite(this.cuurentCity.CityDetails.Key);

    // this.accuweatherService.getCity(city.Key)
    // .then((res: City) => {
    //   this.cuurentCity = res[0];      
    //   this.cuurentCity.CityDetails = city;
    // this.getFiveDaysForecasts(city?.Key);
    //this.isFavorites = this.favoritesService.isFavorite(this.cuurentCity.CityDetails.Key);
    // })
    // .catch(err => {});

  }

  favorites() {
    if (this.isFavorites) {
      this.favoritesService.removeFromFavorites(this.cuurentCity);
    }
    else {
      this.favoritesService.addToFavorite(this.cuurentCity);
    }
    this.isFavorites = !this.isFavorites  
  }
}
