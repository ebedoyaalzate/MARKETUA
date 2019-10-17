import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponent } from './card-detail.component';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CarService } from 'src/app/services/car/car.service';

import { mockProduct } from '../../mocks/mockProduct'

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let routerSpy: any, alertControllerSpy: any, carServiceSpy: any;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', [' ']);
    carServiceSpy = jasmine.createSpyObj('CarService', ['']);
  
    TestBed.configureTestingModule({
      declarations: [ CardDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AlertController, useValue: alertControllerSpy},
        {provide: CarService, useValue: carServiceSpy},
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
