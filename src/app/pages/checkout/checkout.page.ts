import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {

  checkoutForm: any = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private countryApi: CountryService, private router: Router) {

  }

  public departamentoCapturado: any = new Array();
  public ciudades: any = new Array();
  public ciudadesDepartamentoCapturado?: any = Array();
  public ciudadesDepartamento?: any = Array();
  public direccionFormulario: string;

  ngOnInit() {
    this.countryApi.findCountries().subscribe(response => {
      this.ciudades = response;
    });
  }

  register(formPru) {
    console.log("formu: " + formPru);
  }

  obtenerCiudad() {
    this.ciudadesDepartamento = JSON.parse(this.departamentoCapturado);

    //alert('la ciudad es: ' + JSON.stringify(this.ciudadCapturada));
    // console.log('la ciudad es: ' + JSON.stringify(this.ciudadesDepartamento.departamento));
  }

  routingReview() {
    localStorage["checkoutLocal"] = JSON.stringify(this.checkoutForm);

    this.direccionFormulario = this.direccionFormulario + ', '
      + this.ciudadesDepartamentoCapturado.replace(/['"]+/g, '') + '/' + this.ciudadesDepartamento.departamento;
    this.router.navigate(['/review-order', this.direccionFormulario]);
  }

  /*obtenerCiudadDepartamento() {
    alert('la ciudad es: ' + this.ciudadesDepartamentoCapturado);
  }*/
}
