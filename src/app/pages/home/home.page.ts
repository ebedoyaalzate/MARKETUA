import { ProductDetail } from './../../models/productDetail';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  searchText = '';
  products: ProductDetail[];
  productsRuby: ProductDetail[];
  productsGo: ProductDetail[];
  productsFlask: ProductDetail[];

  constructor(
    private productService: ProductService) {}

  ngOnInit() {
  }

  findProduct() {
    this.products = [];
    this.productService.findProductsRuby(this.searchText).subscribe(res => {
      this.products = this.products.concat(res.products);
      this.productsRuby = res.products;
    });
    this.productService.findProductsGo(this.searchText).subscribe(res => {
      this.products = this.products.concat(res.products);
      this.productsGo = res.products;
    });
    this.productService.findProductsFlask(this.searchText).subscribe(res => {
      this.products = this.products.concat(res.products);
      this.productsFlask = res.products;
    });
  }
}
