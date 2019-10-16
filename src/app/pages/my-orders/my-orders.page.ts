import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  userDetails: any
  order: any[];
  ordenCheckoutLocal: any;
  name: string;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let username = this.authService.userDetails.email.split('@')[0];
    this.order = []
    this.usersService.getOrdersGo(username).subscribe(res => {
      this.order = this.order.concat(res.orders)
    });
    this.usersService.getOrdersFlask(username).subscribe(res => {
      this.order = this.order.concat(res.orders)
    });
    this.usersService.getOrdersRuby(username).subscribe(res => {
      this.order = this.order.concat(res.orders)
    });
  }

}
