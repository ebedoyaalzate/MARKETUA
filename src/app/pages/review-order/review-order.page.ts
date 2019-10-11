import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payu } from '../../models/payu';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  //myForm: FormGroup;

  Pasarela = new Payu();
  direccionRecibida: string;
  merchantId: string = '508029';
  debugger;
  pagoCompleto: string = '30000';
  tipoMoneda: string = 'COP';
  codigoReferencia: string;
  signatureMD5: string;
  apiKeyPrueba: string = '4Vj8eK4rloUd272L48hsrarnUA';
  constructor(private activateRoute: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    this.codigoReferencia = this.uuidv4();

    //this.myForm = this.fb.group({
    //  merchantId: new FormControl('merchantId')
    //  //email: new FormControl(''),
    //  //password: new FormControl('')
    //});

    //console.log(this.myForm.value);
  }

  algo() {
    this.http.post<any>(`https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/`, {})
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  pagarPayu() {
    this.signatureMD5 = Md5.init(this.apiKeyPrueba + '~' + this.merchantId + '~'
      + this.codigoReferencia + '~' + this.pagoCompleto + '~' + this.tipoMoneda);
    debugger;
    this.Pasarela.merchantId = '508029';
    this.Pasarela.accountId = '512321';
    this.Pasarela.description = 'Ventas Marketua';
    this.Pasarela.referenceCode = this.codigoReferencia;
    this.Pasarela.amount = '30000';
    this.Pasarela.tax = '0';
    this.Pasarela.taxReturnBase = '0';
    this.Pasarela.currency = 'COP';
    this.Pasarela.signature = this.signatureMD5;
    this.Pasarela.test = '1';
    this.Pasarela.buyerEmail = 'test@test.com';
    this.Pasarela.responseUrl = 'http://www.test.com/response';
    this.Pasarela.confirmationUrl = 'http://www.test.com/confirmation';

    //const httpOptions = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'text/html',
    //    'Access-Control-Allow-Origin': '*'
    //  })
    //};


    this.http.post(`https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/`, JSON.stringify(this.Pasarela))
      .subscribe(res => {
        console.log(res);
      },
        err => {
          console.log('Error ocurrio');
        });
    //console.log("payu" + this.myForm.value);
    //document.getElementById('payu').submit();
  }

}
