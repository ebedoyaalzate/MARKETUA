import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPage } from './detail.page';
import { ProductService } from 'src/app/services/product/product.service';
import { AlertController } from '@ionic/angular';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute } from '@angular/router';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let routeSpy, productServiceSpy, carServiceSpy, alertControllerSpy;

  beforeEach(async(() => {
    routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', [' ']);
    carServiceSpy = jasmine.createSpyObj('CarService', ['']);

    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ProductService, useValue: productServiceSpy},
        {provide: AlertController, useValue: alertControllerSpy},
        {provide: CarService, useValue: carServiceSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;

    // Create mock functions
    spyOn(component,'findProduct').and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findProduct when component is created', () => {
    expect(component.findProduct).toHaveBeenCalled();
  });
});
