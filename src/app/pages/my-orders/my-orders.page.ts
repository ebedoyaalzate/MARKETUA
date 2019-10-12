import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  order: any[];
  ordenCheckoutLocal: any;
  name: string;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.order = []
    this.usersService.getOrdersGo('edison').subscribe(res => {
      this.order = this.order.concat(res.orders)
      console.log(this.order);
    });
    this.usersService.getOrdersFlask('edison').subscribe(res => {
      this.order = this.order.concat(res.orders)
    });
    this.usersService.getOrdersRuby('edison').subscribe(res => {
      this.order = this.order.concat(res.orders)
    });
  }

}
