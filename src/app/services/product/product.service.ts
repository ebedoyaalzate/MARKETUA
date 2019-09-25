import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findProductsMock(searchText: string) {
    return this.http.get<any>(`https://my-json-server.typicode.com/ebedoyaalzate/fakeProducts/db`, {}); // Api mock
 }

 productDetailMock(id) {
   return this.http.get<any>(`https://my-json-server.typicode.com/ebedoyaalzate/fakeProducts/products/${id}`, {}); // Api mock
 }

  findProductsRuby(searchText: string) {
    return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/search?q=${searchText}`, {}); // Api Ruby
  }

  productDetailRuby(id) {
    return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/items/${id}`, {}); // Api Ruby
  }

  findProductsFlask(searchText: string) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/search?q=${searchText}`, {}); // Api Ruby
  }

  productDetailFlask(id) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/items/${id}`, {}); // Api Ruby
  }

  findProductsGo(searchText: string) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/search?q=${searchText}`, {}); // Api Ruby
  }

  productDetailGo(id) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/items/${id}`, {}); // Api Ruby
  }

  productDetail(id, prov) {
    if (prov === 'ruby') {
      return this.productDetailRuby(id);
    } else if (prov === 'go') {
      return this.productDetailGo(id);
    } else if (prov === 'flask') {
      return this.productDetailFlask(id);
    }
  }
}
