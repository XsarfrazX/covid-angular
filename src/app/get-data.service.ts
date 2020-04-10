import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private _http: HttpClient) { }
  

  private httpOptions = {
    responseType: 'text'
  };
  getData() {
    return this._http.get("https://docs.google.com/spreadsheets/d/1tXJrW_HMi15j8yjVAFIFO91y08m-3knIXO8oJ9XFmbE/export?format=csv", {responseType: 'text'})
    .pipe(map(result=>{return result}));
  }

}
