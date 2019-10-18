import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProductComponent } from './car-product.component';

import { AlertController } from '@ionic/angular';
import { CarService } from './../../services/car/car.service';
import { ProductService } from './../../services/product/product.service';
import { mockProduct } from '../../mocks/mockProduct'

describe('CarProductComponent', () => {
  let component: CarProductComponent;
  let fixture: ComponentFixture<CarProductComponent>;
  let productServiceSpy, carServiceSpy, alertControllerSpy;

  beforeEach(async(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['']);
    carServiceSpy = jasmine.createSpyObj('CarService', ['']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['']);

    TestBed.configureTestingModule({
      declarations: [ CarProductComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ProductService, useValue: productServiceSpy},
        {provide: CarService, useValue: carServiceSpy},
        {provide: AlertController, useValue: alertControllerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarProductComponent);
    component = fixture.componentInstance;
    //component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
