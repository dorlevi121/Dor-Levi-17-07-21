import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { City } from '../models/city';
import { FavoriteCity } from '../models/favorite-city';
import { AccuweatherService } from './accuweather.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesCities: City[] = [];
  private favoritesKeys: FavoriteCity[] = [];

  constructor(private lsService: LocalStorageService, private acciweatherService: AccuweatherService) {
    this.favoritesKeys = JSON.parse(localStorage.getItem("favorites")) || [];
  }

  addToFavorite(city: City) {
    this.favoritesKeys.push({ Key: city.CityDetails.Key, Name: city.CityDetails.LocalizedName });
    this.lsService.set("favorites", JSON.stringify(this.favoritesKeys));
  }

  removeFromFavorites(city: City) {
    let favArray = [...this.favoritesKeys];
    favArray = favArray.filter(item => item.Key !== city.CityDetails.Key);
    this.favoritesKeys = [...favArray];
    this.lsService.set("favorites", JSON.stringify(this.favoritesKeys));
  }

  async getFavoritesCities() {
    await Promise.all(this.favoritesKeys.map((item) => {
      return this.acciweatherService.getCity(item.Key).then(res => {
        const city: City = res[0];
        city.CityDetails = {AdministrativeArea: null,Country:null,Rank:null,Type:null,Version:null,Key:item.Key,LocalizedName:item.Name};
        return city;
      }).then(data => {
        return data;
      })
    }))
      .then(cities => {
        console.log(cities);
        this.favoritesCities = cities;
      });
    return this.favoritesCities;
  }

  isFavorite(city: FavoriteCity): boolean {
    return this.favoritesKeys.indexOf(city) === -1 ? false : true;
  }

}

