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

  item1: any;
  item2: any;
  itemArray: any;

  buyerEmail: String
  direccionRecibida: string;
  pagoCompleto: string = '11000000';
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
    //this.findProduct();
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.ordenCheckoutLocal = JSON.parse(localStorage['checkoutLocal']);
    this.nombrePersona = this.ordenCheckoutLocal.name;
    this.buyerEmail = this.ordenCheckoutLocal.email;

    this.metodoEnvioFavorito = 'ContraEntega';

    this.item1 = new Items();
    this.item1.backend = 'GO';
    this.item1.item_id = '1';
    this.item1.quantity = '9000000';

    this.item2 = new Items();
    this.item2.backend = 'GO';
    this.item2.item_id = '2';
    this.item2.quantity = '2000000';

    this.itemArray = new Array<Items>();
    this.itemArray.push(this.item1);
    this.itemArray.push(this.item2);

  }

  /*findProduct() {
    this.productService.productDetail(45, 'ruby').subscribe(res => {
      this.product = res;
      console.log("SOy find:" + JSON.stringify(this.product));
    });
  }*/

  getCar() {
    this.carService.getCar().then(prod => {
      console.log('soy pro: ' + JSON.stringify(prod));
      //this.productos = prod;
      debugger;
      this.productService.productDetail(prod.id, prod.prov).forEach(res => {
        this.product = res;
        console.log("SOy res:" + JSON.stringify(this.product));
      });
    });
  }

  /*calcularValor() {
    debugger;
    let property: any;

    //console.log(this.productos);
    let cosita = this.carService.getCar().then(prod => {
      this.productos = prod;
    });
    console.log("soy prod:" + this.productos);

    console.log("soy prod:" + cosita);
  }*/

  comprarenGo() {
    this.checkoutModel.username = this.ordenCheckoutLocal.name;
    this.checkoutModel.payment_method = this.metodoEnvioFavorito;
    this.checkoutModel.shipment_address = this.direccionRecibida;
    this.checkoutModel.total = parseInt(this.pagoCompleto);
    this.checkoutModel.items = this.itemArray;

    this.checkoutService.checkoutGo(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Go' + JSON.stringify(compra));
        //this.pagarPayu();
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
        console.log(err);
      }
    );
  }

}
