import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private subject = new Subject<any>();
  public changes = this.subject.asObservable();

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addToCar(id: string, prov: string) {
    const prod = {
      id,
      units: 1,
      prov
    };
    const car = [prod];
    this.storage.set('car', car);
  }

  changeUnit(id: string, prov: string, units: number) {
    this.storage.get('car').then(val => {
      val[0].units = units;
      this.storage.set('car', val);
    });
  }

  deleteProduct(id: string, prov: string) {
    this.storage.set('car', []);
    this.subject.next({ id, prov });
  }

  getCar() {
    return this.storage.get('car');
  }

  changeProducts() {
    this.subject.next();
  }

  deleteCar() {
    this.storage.clear();
  }

  saveCar(car) {
    let formatCar
    formatCar = {
      items: [{
        item_id: car[0].id,
        quantity: car[0].units,
        backend: car[0].prov
      }],
      username: this.authService.userDetails.email.split('@')[0]
    };
    if (formatCar.items[0].backend === 'ruby') {
      return this.http.post<any>('http://marketua-develop-api.herokuapp.com/save-cart/', formatCar);
    } else if (formatCar.items[0].backend === 'go') {
      return this.http.post<any>('https://marketua-go-api.herokuapp.com/save-cart', formatCar);
    } else if (formatCar.items[0].backend === 'flask') {
      return this.http.post<any>('https://marketuaflask.herokuapp.com/save-cart/', formatCar);
    }
  }
}
