import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverCategoriesComponent } from './popover-categories.component';
import { PopoverController } from '@ionic/angular';

describe('PopoverCategoriesComponent', () => {
  let component: PopoverCategoriesComponent;
  let fixture: ComponentFixture<PopoverCategoriesComponent>;
  let popoverSpy;

  beforeEach(async(() => {
    popoverSpy = jasmine.createSpyObj('PopoverController', ['']);

    TestBed.configureTestingModule({
      declarations: [ PopoverCategoriesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: PopoverController, useValue: popoverSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create categories component', () => {
    expect(component).toBeTruthy();
  });
});
