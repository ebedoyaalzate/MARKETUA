import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";
import { Form, FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { Checkout } from 'src/app/models/checkout';
import { CarService } from 'src/app/services/car/car.service';
import { Items } from 'src/app/models/Items';

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
  pagoCompleto: string = '30000';
  tipoMoneda: string = 'COP';
  codigoReferencia: string;
  signatureMD5: string;
  apiKeyPrueba: string = '4Vj8eK4rloUd272L48hsrarnUA';
  nombrePersona: string;
  productos: any

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
    this.carService.getCar().then(prod => {
      this.productos = prod;
    });
    debugger;
  }*/

  pagarPayu() {
    this.signatureMD5 = Md5.init(this.apiKeyPrueba + '~' + this.merchant + '~'
      + this.codigoReferencia + '~' + this.pagoCompleto + '~' + this.tipoMoneda);
    document.getElementById('payu')["submit"]();
  }

  comprarenGo() {
    let item = new Items();
    item.backend = 'prueba';
    item.item_id = '1';
    item.quantity = '1';
    debugger;

    let itemArray = new Array<Items>();
    itemArray.push(item);

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
