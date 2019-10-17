import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checkout } from 'src/app/models/checkout';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }
  
  idToken = this.auth.userIdToken;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'idToken': this.idToken
    })
  };

   checkoutGo(compra: Checkout) {
      fetch('https://marketua-go-api.herokuapp.com/checkout', {
      method: 'POST',
          mode: 'no-cors' ,
          body: JSON.stringify(compra),
          headers: new Headers({ 'idToken':this.idToken}),
      }).then(res => {
      console.log('Compra exitosa para Go' + JSON.stringify(compra));
        });
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
