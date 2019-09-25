import { CarService } from './../../services/car/car.service';
import { ProductService } from './../../services/product/product.service';
import { ProductDetail } from './../../models/productDetail';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-car-product',
  templateUrl: './car-product.component.html',
  styleUrls: ['./car-product.component.scss'],
})
export class CarProductComponent implements OnInit {

  @Input() prod: any;
  product: ProductDetail;
  units: number;

  constructor(
    private productService: ProductService,
    private carService: CarService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carService.getCar().then(car => {
      car.forEach(prod => {
        if (prod.id === this.prod.id && prod.prov === this.prod.prov) {
          this.units = prod.units;
        }
      });
    });
    this.productService.productDetail(this.prod.id, this.prod.prov).subscribe(prod => {
      this.product = prod;
    });
  }

  restUnits() {
    if (this.units !== 1) {
      this.units --;
      this.carService.changeUnit(this.prod.id, this.prod.prov, this.units);
    }
  }

  addUnits() {
    this.units ++;
    this.carService.changeUnit(this.prod.id, this.prod.prov, this.units);
  }

  deleteProduct() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: '¿Esta seguro de eliminar el producto del carro?',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => {
            this.carService.deleteProduct(this.prod.id, this.prod.prov);
          }
        }
      ]
    });
    await alert.present();
  }
}
