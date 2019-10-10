import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  direccionRecibida: string;
  merchant: string = '508029';
  pagoCompleto: string = '30000';
  tipoMoneda: string = 'COP';
  codigoReferencia: string;
  signatureMD5: string;
  apiKeyPrueba: string = '4Vj8eK4rloUd272L48hsrarnUA';
  constructor(private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.codigoReferencia = this.uuidv4();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  pagarPayu() {
    this.signatureMD5 = Md5.init(this.apiKeyPrueba + '~' + this.merchant + '~'
      + this.codigoReferencia + '~' + this.pagoCompleto + '~' + this.tipoMoneda);
    //document.getElementById('payu').submit();
  }

}
