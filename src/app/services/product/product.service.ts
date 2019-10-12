import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetail } from 'src/app/models/productDetail';

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
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/search?q=${searchText}`, {}); // Api Flask
  }

  productDetailFlask(id) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/items/${id}`, {}); // Api Flask
  }

  findProductsGo(searchText: string) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/search?q=${searchText}`, {}); // Api Go
  }

  productDetailGo(id) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/items/${id}`, {}); // Api Go
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

  // Categories
  findProductsByCategoryRuby(category) {
    return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/items/category/${category}`,{}); // Api Ruby
  }

  findProductsByCategoryFlask(category) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/items/category/${category}`,{}); // Api Flask
  }

  findProductsByCategoryGo(category) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/items/category/${category}`,{}); // Api Go
  }

  // Brands
  findProductsByBrandRuby(brand) {
    return this.http.get<any>(`http://marketua-develop-api.herokuapp.com/items/brand/${brand}`,{}); // Api Ruby
  }

  findProductsByBrandFlask(brand) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/items/brand/${brand}`,{}); // Api Flask
  }

  findProductsByBrandGo(brand) {
    return this.http.get<any>(`http://marketua-go-api.herokuapp.com/items/brand/${brand}`,{}); // Api Go
  }
}
