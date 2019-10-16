import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checkout } from 'src/app/models/checkout';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkoutGo(compra: Checkout): Observable<Checkout> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'idToken=123'
      })
    };
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketua-go-api.herokuapp.com/checkout`, compraJson, httpOptions);
  }

  checkoutFlask(compra: Checkout): Observable<Checkout> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'idToken=123'
      })
    };
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketuaflask.herokuapp.com/checkout`, compraJson, httpOptions);
  }

  checkoutRuby(compra: Checkout): Observable<Checkout> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'idToken=123'
      })
    };
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`http://marketua-api.herokuapp.com/checkout`, compraJson, httpOptions);
  }
}
