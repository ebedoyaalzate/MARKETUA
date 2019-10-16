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
    const car = [prod];
    this.storage.set('car', car);
  }

  changeUnit(id: string, prov: string, units: number) {
    this.storage.get('car').then(val => {
      val[0].units += 1;
      this.storage.set('car', val);
    });
  }

  deleteProduct(id: string, prov: string) {
    this.storage.set('car', []);
    this.subject.next({id, prov});
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
