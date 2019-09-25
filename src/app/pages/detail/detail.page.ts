import { CarService } from '../../services/car/car.service';
import { ProductDetail } from '../../models/productDetail';
import { ProductService } from '../../services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  idProduct: string;
  provider: string;
  product: ProductDetail;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carService: CarService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.findProduct();
  }

  findProduct() {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.provider = this.route.snapshot.paramMap.get('prov');
    this.productService.productDetail(this.idProduct, this.provider).subscribe(res => {
      this.product = res;
    });
  }

  addToCar() {
    this.carService.addToCar(this.idProduct, this.provider);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exitoso',
      message: 'El producto se agrego al carro',
      buttons: ['OK']
    });
    await alert.present();
  }
}
