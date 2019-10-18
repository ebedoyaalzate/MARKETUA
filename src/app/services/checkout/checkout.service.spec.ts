import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

describe('CheckoutService', () => {
  let httpTestingController: HttpTestingController;
  let service: CheckoutService;
  let httpClientSpy, authServiceSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    TestBed.configureTestingModule({
      providers: [
        CheckoutService,
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CheckoutService);
  });
  
  afterEach(() => {
    httpTestingController.verify();
    httpTestingController.expectNone;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});