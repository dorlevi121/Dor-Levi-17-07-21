import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { AccuweatherService } from './accuweather.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesCities: City[] = [];
  private favoritesKeys: string[] = [];

  constructor(private lsService: LocalStorageService, private acciweatherService: AccuweatherService) {
    this.favoritesKeys = JSON.parse(localStorage.getItem("favorites")) || [];
  }

  addToFavorite(city: City) {
    this.favoritesKeys.push(city.CityDetails.Key);
    this.lsService.set("favorites", JSON.stringify(this.favoritesKeys));
  }

  removeFromFavorites(city: City) {
    let favArray = [...this.favoritesKeys];
    favArray = favArray.filter(item => item !== city.CityDetails.Key);
    this.favoritesKeys = [...favArray]
    this.lsService.set("favorites", JSON.stringify(this.favoritesKeys));
  }

  getFavoritesCities() {
    this.favoritesKeys.forEach(key => {
      this.acciweatherService.getCity(key)
        .then(res => {
          this.favoritesCities.push(res[0]);
        })
    })
  }

  isFavorite(key: string): boolean {
    return this.favoritesKeys.indexOf(key) === -1 ? false : true;
  }

}

