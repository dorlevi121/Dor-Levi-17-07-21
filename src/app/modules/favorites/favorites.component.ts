import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'weather-app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoritesCities: City[] = [];
  public isMobile: boolean;



  @ViewChild('carousel', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(private router: Router, private favoritesService: FavoritesService, private settingService: SettingsService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.favoritesService.getFavoritesCities()
      .then(cities => {
        this.favoritesCities = cities;
      })
      .catch(err => {
        this.toastService.setText({
          show: true,
          type: 'danger',
          text: err.Message || 'Server Error'
        })
      });
    this.isMobile = this.settingService.isMobile;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  navigate(city: City) {
    this.router.navigate([''], { state: { CityDetails: city.CityDetails } });
  }
}
