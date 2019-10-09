import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  findCountries() {
    return this.http.get<any>(`https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json`, {}); // Api mock
  }
}
