import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isPlatformBrowser: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  set(key: string, value: any) {
    if (this.isPlatformBrowser)
      localStorage.setItem(key, value);
  }

  get(key: string) {
    if (this.isPlatformBrowser)
      return localStorage.getItem(key);
    return false;
  }

  remove(key: string) {
    if (this.isPlatformBrowser)
      localStorage.removeItem(key);
  }
}
