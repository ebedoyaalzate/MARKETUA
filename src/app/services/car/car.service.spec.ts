import { TestBed } from '@angular/core/testing';
import { CarService } from './car.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { Storage } from '@ionic/storage';

describe('CarService', () => {
  let httpTestingController: HttpTestingController;
  let service: CarService;
  let storageSpy;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['']);
    TestBed.configureTestingModule({
      providers: [CarService,
      {provide: Storage, useValue: storageSpy}],
      imports: [HttpClientTestingModule]
      
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CarService);
  });
  
  afterEach(() => {
    httpTestingController.verify();
    httpTestingController.expectNone
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

