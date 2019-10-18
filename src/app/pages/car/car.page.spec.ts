import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPage } from './car.page';
import { CarService } from 'src/app/services/car/car.service';

describe('CarPage', () => {
  let component: CarPage;
  let fixture: ComponentFixture<CarPage>;
  let carServiceSpy;

  beforeEach(async(() => {
    carServiceSpy = jasmine.createSpyObj('CarService', ['']);

    TestBed.configureTestingModule({
      declarations: [ CarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: CarService, useValue: carServiceSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
