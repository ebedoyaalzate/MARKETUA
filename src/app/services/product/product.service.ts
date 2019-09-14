import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findProducts(searchText: string) {
     //return this.http.get<any>(`https://my-json-server.typicode.com/ebedoyaalzate/fakeProducts/db`, {}); Api mock
     return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/search?q=${searchText}`, {}); // Api Ruby
  }

  productDetail(id) {
    //return this.http.get<any>(`https://my-json-server.typicode.com/ebedoyaalzate/fakeProducts/products/${id}`, {}); Api mock
    return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/items/${id}`, {}); // Api Ruby
  }
}
