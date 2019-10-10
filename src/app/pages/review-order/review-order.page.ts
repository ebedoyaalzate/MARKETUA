import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.page.html',
  styleUrls: ['./review-order.page.scss'],
})
export class ReviewOrderPage implements OnInit {

  direccionRecibida: string;
  constructor(private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.direccionRecibida = this.activateRoute.snapshot.paramMap.get('direccion');
    //alert('la direccion fue ' + this.direccionRecibida);
  }

}
