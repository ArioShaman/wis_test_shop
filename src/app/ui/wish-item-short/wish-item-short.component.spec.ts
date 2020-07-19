import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishElComponent } from './wish-el.component';

describe('WishElComponent', () => {
  let component: WishElComponent;
  let fixture: ComponentFixture<WishElComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishElComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
