import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checkout } from 'src/app/models/checkout';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkoutGo(compra: Checkout): Observable<Checkout> {
    const compraJson = JSON.stringify(compra);
    return this.http.post<Checkout>(`https://marketua-go-api.herokuapp.com/checkout`, compraJson);
  }
}