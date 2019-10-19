import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '../auth/auth.service';


describe('CheckoutService', () => {
  let httpTestingController: HttpTestingController;
  let service: CheckoutService;
  let authSpy;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AuthService', ['']);
    TestBed.configureTestingModule({
      providers: [CheckoutService,
        {provide: AuthService, useValue: authSpy}],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CheckoutService);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});