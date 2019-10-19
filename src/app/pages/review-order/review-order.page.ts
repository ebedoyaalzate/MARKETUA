import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { Checkout } from 'src/app/models/checkout';
import { CarService } from 'src/app/services/car/car.service';
import { Items } from 'src/app/models/items';
import { ProductDetail } from 'src/app/models/productDetail';
import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  metodoEnvioFavorito: string;
  metodosEnvio: string[] = ['ContraEntega'];

  checkoutModel = new Checkout();

  itemArray: any;

  buyerEmail: string;
  direccionRecibida: string;
  pagoCompleto = 0;
  nombrePersona: string;

  productos: any;

  ordenCheckoutLocal: any;

  product: ProductDetail;

  constructor(private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private carService: CarService,
    private productService: ProductService,
    private auth: AuthService,
    private alertController: AlertController,
    private router: Router
    ) {
  }
  ngOnInit() {

    this.getCar();
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.ordenCheckoutLocal = JSON.parse(localStorage['checkoutLocal']);
    this.nombrePersona = this.auth.userDetails.displayName;
    this.buyerEmail = this.auth.userDetails.email;

    this.metodoEnvioFavorito = 'ContraEntega';

    this.itemArray = new Array<Items>();
  }

  findProduct(prodId: any) {
    this.productService.productDetail(prodId.id, prodId.prov).subscribe(res => {
      let itemCar = new Items();
      itemCar.backend = prodId.prov;
      itemCar.item_id = prodId.id.toString();
      itemCar.quantity = prodId.units.toString();
      this.itemArray.push(itemCar);
      this.pagoCompleto = this.pagoCompleto + (parseInt(res.price) * prodId.units);
    });
  }

  getCar() {
    this.carService.getCar()
      .then(items => {
        items.forEach(item => {
          this.findProduct(item);
        });
      });
  }

  comprarenGo() {
    this.checkoutModel.username = this.ordenCheckoutLocal.name;
    this.checkoutModel.payment_method = this.metodoEnvioFavorito;
    this.checkoutModel.shipment_address = this.direccionRecibida;
    this.checkoutModel.total = this.pagoCompleto;
    this.checkoutModel.items = this.itemArray;
    console.log(this.checkoutModel);
    

    this.checkoutService.checkoutGo(this.checkoutModel);

    this.checkoutService.checkoutFlask(this.checkoutModel);

    this.checkoutService.checkoutRuby(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Ruby' );
        console.log(compra);
      },
      err => {
        console.log('Error Ruby:');
        console.log(err);
      }
    );
    this.presentAlert()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'La compra ha sido exitosa',
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }
}
