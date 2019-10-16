import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";
import { Form, FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { Checkout } from 'src/app/models/checkout';
import { CarService } from 'src/app/services/car/car.service';
import { Items } from 'src/app/models/items';
import { ProductDetail } from 'src/app/models/productDetail';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  metodoEnvioFavorito: string;
  metodosEnvio: string[] = ['ContraEntega', 'Normal', 'Rapida'];

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
    private productService: ProductService) {
  }
  ngOnInit() {

    this.getCar();
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.ordenCheckoutLocal = JSON.parse(localStorage['checkoutLocal']);
    this.nombrePersona = this.ordenCheckoutLocal.name;
    this.buyerEmail = this.ordenCheckoutLocal.email;

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

    debugger;
    this.checkoutService.checkoutGo(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Go' + JSON.stringify(compra));
      },
      err => {
        console.log(err);
      }
    );

    this.checkoutService.checkoutFlask(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Flask' + JSON.stringify(compra));
      },
      err => {
        console.log('Error flask:' + err);
      }
    );

    this.checkoutService.checkoutRuby(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Ruby' + JSON.stringify(compra));
      },
      err => {
        console.log('Error Ruby:' + err);
      }
    );
  }

}
