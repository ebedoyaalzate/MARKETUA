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
        'idToken': '123'
      })
    };
    debugger;

    console.log(httpOptions.headers.get.name)
    const compraJson = JSON.stringify(compra);
    console.log(compraJson);
    return this.http.post<Checkout>(`https://marketua-go-api.herokuapp.com/checkout`, compraJson, httpOptions);
  }
}
