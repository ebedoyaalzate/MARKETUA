import { ProductDetail } from './../../models/productDetail';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { MenuController } from '@ionic/angular';


import { PopoverController } from '@ionic/angular';
import { PopoverCategoriesComponent } from 'src/app/components/popover-categories/popover-categories.component';
import { PopoverBrandsComponent } from 'src/app/components/popover-brands/popover-brands.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  searchText = '';
  category = '';
  brand = '';
  products: ProductDetail[];
  productsRuby: ProductDetail[];
  productsGo: ProductDetail[];
  productsFlask: ProductDetail[];
  userDetail: any;

  constructor(
    private productService: ProductService,
    public popoverController: PopoverController,
    private menu: MenuController,
    public authService: AuthService,
    public afAuth: AngularFireAuth) {

      this.userDetail = this.authService.userDetails;
    }

  ngOnInit() {
    this.userDetail = this.authService.userDetails;
    
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
  
  async presentPopoverCategories(event) {
    const popover = await this.popoverController.create({
      component: PopoverCategoriesComponent,
      event: event,
      translucent: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.category = dataReturned.data;
        this.findProductsByCategory()
      }
    });
    return await popover.present();
  }

  async presentPopoverBrands(event) {
    const popover = await this.popoverController.create({
      component: PopoverBrandsComponent,
      event: event,
      translucent: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.brand = dataReturned.data;
        this.findProductsByBrand()
      }
    });
    return await popover.present();
  }

  private findProductsByCategory(){
    this.products = [];
    this.productsFlask = this.productsGo = this.productsRuby = []

    this.productService.findProductsByCategoryRuby(this.category).subscribe(res => {
      this.products.concat(res.products);
      this.productsRuby = res.products;
    });
    this.productService.findProductsByCategoryFlask(this.category).subscribe(res => {
      this.products.concat(res.products);
      this.productsFlask = res.products;
    });
    this.productService.findProductsByCategoryGo(this.category).subscribe(res => {
      this.products.concat(res.products);
      this.productsGo = res.products;
    });
  }

  private findProductsByBrand(){
    this.products = [];
    this.productsFlask = this.productsGo = this.productsRuby = []

    this.productService.findProductsByBrandRuby(this.brand).subscribe(res => {
      this.products.concat(res.products);
      this.productsRuby = res.products;
    });
    this.productService.findProductsByBrandFlask(this.brand).subscribe(res => {
      this.products.concat(res.products);
      this.productsFlask = res.brands;
    });
    this.productService.findProductsByBrandGo(this.brand).subscribe(res => {
      this.products.concat(res.products);
      this.productsGo = res.products;
    });
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
}
