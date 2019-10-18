import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPage } from './checkout.page';

import { CountryService } from 'src/app/services/country/country.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('CheckoutPage', () => {
  let component: CheckoutPage;
  let fixture: ComponentFixture<CheckoutPage>;
  let countryServiceSpy, routerSpy, authServiceSpy;

  beforeEach(async(() => {

    countryServiceSpy = jasmine.createSpyObj('CountryService', ['']);
    routerSpy = jasmine.createSpyObj('Router', ['']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [' ']);

    TestBed.configureTestingModule({
      declarations: [ CheckoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: CountryService, useValue: countryServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
