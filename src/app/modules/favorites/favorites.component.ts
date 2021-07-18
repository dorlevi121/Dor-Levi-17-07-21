import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'weather-app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public favoritesCities: City[] = [];
  public isMobile: boolean;

  public temperatureType: 'c' | 'f';
  private $temperatureType: Subscription;

  @ViewChild('carousel', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(private favoritesService: FavoritesService, private settingService: SettingsService) { }

  ngOnInit() {
    this.favoritesService.getFavoritesCities()
      .then(cities => {
        console.log(cities);
        this.favoritesCities = cities;
      });

    this.$temperatureType = this.settingService.temperatureTypeSubscription
      .subscribe(type => {
        this.temperatureType = type;
      });

    this.isMobile = this.settingService.isMobile;
    console.log(this.isMobile, this.favoritesCities);
    
  }

  cToF(celsius: number) {
    let cTemp = celsius;
    let cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr.toFixed();
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  ngOnDestroy(): void {
    if (this.$temperatureType)
      this.$temperatureType.unsubscribe()
  }

  test() {
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
    this.favoritesCities.push(
      {
        "LocalObservationDateTime": "2021-07-18T21:41:00+03:00",
        "EpochTime": 1626633660,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 29,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperature": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RealFeelTemperatureShade": {
          "Metric": {
            "Value": 31,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 88,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "RelativeHumidity": 67,
        "IndoorRelativeHumidity": 67,
        "DewPoint": {
          "Metric": {
            "Value": 22.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Wind": {
          "Direction": {
            "Degrees": 23,
            "Localized": "NNE",
            "English": "NNE"
          },
          "Speed": {
            "Metric": {
              "Value": 15.1,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 9.4,
              "Unit": "mi/h",
              "UnitType": 9
            }
          }
        },
        "WindGust": {
          "Speed": {
            "Metric": {
              "Value": 17.3,
              "Unit": "km/h",
              "UnitType": 7
            },
            "Imperial": {
              "Value": 10.7,
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
            "Value": 12192,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 40000,
            "Unit": "ft",
            "UnitType": 0
          }
        },
        "Pressure": {
          "Metric": {
            "Value": 1004.7,
            "Unit": "mb",
            "UnitType": 14
          },
          "Imperial": {
            "Value": 29.67,
            "Unit": "inHg",
            "UnitType": 12
          }
        },
        "PressureTendency": {
          "LocalizedText": "Rising",
          "Code": "R"
        },
        "Past24HourTemperatureDeparture": {
          "Metric": {
            "Value": 0.5,
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
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 90,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WindChillTemperature": {
          "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "WetBulbTemperature": {
          "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 76,
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
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past12HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 28.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 84,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 32.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 90,
                "Unit": "F",
                "UnitType": 18
              }
            }
          },
          "Past24HourRange": {
            "Minimum": {
              "Metric": {
                "Value": 23.5,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 74,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Maximum": {
              "Metric": {
                "Value": 33.3,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 92,
                "Unit": "F",
                "UnitType": 18
              }
            }
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        CityDetails: null
      }
    );
  }
}
