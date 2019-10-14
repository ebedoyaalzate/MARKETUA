import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverBrandsComponent } from './popover-brands.component';
import { PopoverController } from '@ionic/angular';

describe('PopoverBrandsComponent', () => {
  let component: PopoverBrandsComponent;
  let fixture: ComponentFixture<PopoverBrandsComponent>;
  let popoverSpy;

  beforeEach(async(() => {
    popoverSpy = jasmine.createSpyObj('PopoverController', ['']);

    TestBed.configureTestingModule({
      declarations: [ PopoverBrandsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: PopoverController, useValue: popoverSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create brands component', () => {
    expect(component).toBeTruthy();
  });
});
