import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('CountryService', () => {
  let httpTestingController: HttpTestingController;
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService],
      imports: [HttpClientTestingModule]
    });
    
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CountryService);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});