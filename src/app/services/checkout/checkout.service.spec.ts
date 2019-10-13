import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('CheckoutService', () => {
  let httpTestingController: HttpTestingController;
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutService],
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