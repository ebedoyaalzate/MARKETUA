import { ProductDetail } from '../../models/productDetail';
import { CarService } from '../../services/car/car.service';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {

  productos: any;
  showSave = true;

  constructor(
    private carService: CarService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getCar();
    this.carService.changes.subscribe(product => {
      this.productos = this.productos.filter(prod => prod.id !== product.id && prod.prov !== product.prov);
      this.showSave = false;
    });
  }

  getCar() {
    this.carService.getCar().then(prod => {
      this.productos = prod;
      if (this.productos.length === 0) {
        this.showSave = false;
      }
    });
  }

  saveCar() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Guardar Carrito',
      message: '¿Esta seguro de guardar el carro?',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => {
            this.carService.saveCar(this.productos).subscribe(res => {
              console.log(res);
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
