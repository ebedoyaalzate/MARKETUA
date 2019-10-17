import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checkout } from 'src/app/models/checkout';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  checkoutGo(compra: Checkout): Observable<Checkout> {
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketua-go-api.herokuapp.com/checkout`, compraJson, this.httpOptions);
  }

  checkoutFlask(compra: Checkout): Observable<Checkout> {
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketuaflask.herokuapp.com/checkout`, compraJson, this.httpOptions);
  }

  checkoutRuby(compra: Checkout): Observable<Checkout> {
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketua-develop-api.herokuapp.com/checkout`, compraJson, this.httpOptions);
  }
}
