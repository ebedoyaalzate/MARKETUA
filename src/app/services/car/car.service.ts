import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private subject = new Subject<any>();
  public changes = this.subject.asObservable();

  constructor(private storage: Storage) { }

  addToCar(id: string, prov: string) {
    const prod = {
      id,
      units: 1,
      prov
    };
    this.storage.get('car').then((car) => {
      car = car ? car : [];
      car = car.filter(prod => prod.id != id && prod.prov !== prov);
      car.push(prod);
      this.storage.set('car', car);
    });
  }

  changeUnit(id: string, prov: string, units: number) {
    this.storage.get('car').then(val => {
      val.forEach(prod => {
        if (prod.id === id && prod.prov === prov) {
          prod.units = units;
        }
      });
      this.storage.set('car', val);
    });
  }

  deleteProduct(id: string, prov: string) {
    this.storage.get('car').then((val) => {
      const auxCar = val.filter(prod => prod.id != id && prod.prov !== prov);
      this.storage.set('car', auxCar);
    });
    this.subject.next(id);
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
}
