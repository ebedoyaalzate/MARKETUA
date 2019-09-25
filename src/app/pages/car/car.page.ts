import { ProductDetail } from '../../models/productDetail';
import { CarService } from '../../services/car/car.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {

  @Input() product: ProductDetail;
  productos: any;

  constructor(
    private carService: CarService,
  ) { }

  ngOnInit() {
    this.getCar();
    this.carService.changes.subscribe(id => {
      this.productos = this.productos.filter(prod => prod.id !== id);
    });
  }

  getCar() {
    this.carService.getCar().then(prod => {
      this.productos = prod;
    });
  }
}
