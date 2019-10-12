import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";
import { Form, FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { Checkout } from 'src/app/models/checkout';
import { CarService } from 'src/app/services/car/car.service';
import { Items } from 'src/app/models/Items';
import { ProductDetail } from 'src/app/models/productDetail';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  checkoutModel = new Checkout();

  buyerEmail: String
  direccionRecibida: string;
  merchant: string = '508029';
  pagoCompleto: string = '11000000';
  tipoMoneda: string = 'COP';
  codigoReferencia: string;
  signatureMD5: string;
  apiKeyPrueba: string = '4Vj8eK4rloUd272L48hsrarnUA';
  nombrePersona: string;

  productos: ProductDetail[];

  ordenCheckoutLocal: any;

  constructor(private activateRoute: ActivatedRoute, private checkoutService: CheckoutService, private carService: CarService) {
  }
  ngOnInit() {
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.codigoReferencia = this.uuidv4();
    this.ordenCheckoutLocal = JSON.parse(localStorage['checkoutLocal']);
    this.nombrePersona = this.ordenCheckoutLocal.name;
    this.buyerEmail = this.ordenCheckoutLocal.email;
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
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

  pagarPayu() {
    this.signatureMD5 = Md5.init(this.apiKeyPrueba + '~' + this.merchant + '~'
      + this.codigoReferencia + '~' + this.pagoCompleto + '~' + this.tipoMoneda);
    document.getElementById('payu')["submit"]();
  }

  comprarenGo() {
    let item1 = new Items();
    item1.backend = 'Portatil Macbook Pro';
    item1.item_id = '1';
    item1.quantity = '9000000';

    let item2 = new Items();
    item2.backend = 'Portatil Acer Aspire 5';
    item2.item_id = '1';
    item2.quantity = '2000000';

    let itemArray = new Array<Items>();
    itemArray.push(item1);
    itemArray.push(item2);

    this.checkoutModel.username = this.ordenCheckoutLocal.name;
    this.checkoutModel.payment_method = 'Contraentrega';
    this.checkoutModel.shipment_address = this.direccionRecibida;
    this.checkoutModel.total = parseInt(this.pagoCompleto);
    this.checkoutModel.items = itemArray;

    this.checkoutService.checkoutGo(this.checkoutModel).subscribe(
      compra => {
        console.log('Compra exitosa para Go' + JSON.stringify(compra));
        this.pagarPayu();
      },
      err => {
        console.log(err);
      }
    );
  }

}
