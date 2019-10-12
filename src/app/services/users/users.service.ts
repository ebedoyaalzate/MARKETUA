import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getOrdersGo(username: string) {
    return this.http.get<any>(`https://marketua-go-api.herokuapp.com/orders/edison`)
  }

  getOrdersRuby(username: string) {
    return this.http.get<any>(`http://marketua-api.herokuapp.com/orders/${username}`)
  }

  getOrdersFlask(username: string) {
    return this.http.get<any>(`https://marketuaflask.herokuapp.com/orders/${username}`)
  }
}
