import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketFormComponent } from './basket-form.component';

describe('BasketFormComponent', () => {
  let component: BasketFormComponent;
  let fixture: ComponentFixture<BasketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
