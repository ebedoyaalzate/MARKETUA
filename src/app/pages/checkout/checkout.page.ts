import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {

  constructor(private countryApi: CountryService) { }

  public departamentoCapturado: any = new Array();
  public ciudades: any = new Array();
  public ciudadesDepartamentoCapturado: any = Array();
  public ciudadesDepartamento: any = Array();

  ngOnInit() {
    this.countryApi.findCountries().subscribe(response => {
      this.ciudades = response;
    });
  }

  /*pasarParametros() {
    this.navCtrl.push()
  }*/

  obtenerCiudad() {
    this.ciudadesDepartamento = JSON.parse(this.departamentoCapturado);

    //alert('la ciudad es: ' + JSON.stringify(this.ciudadCapturada));
  }

  obtenerCiudadDepartamento() {
    alert('la ciudad es: ' + this.ciudadesDepartamentoCapturado);
  }
}
