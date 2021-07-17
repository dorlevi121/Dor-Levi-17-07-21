import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }


  setOptions(paramsObj: object) {
    const headersObj = {
      'Content-Type': 'application/json',
    };
    let httpParamsObj = new HttpParams();
    httpParamsObj = httpParamsObj.set('apikey', 'tA5FvuGMHdyLC6AgqdlBRKAujVhygZGg');
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        httpParamsObj = httpParamsObj.set(key.toString(), paramsObj[key].toString());
      }
    }
    return {
      params: httpParamsObj
    };
  }

  get(url: string, params: object = {}) {
    return this.http.get(`${environment.baseApi}${url}`,
      this.setOptions(params));
  }

}
