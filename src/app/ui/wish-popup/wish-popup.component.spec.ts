import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishPopoupComponent } from './wish-popoup.component';

describe('WishPopoupComponent', () => {
  let component: WishPopoupComponent;
  let fixture: ComponentFixture<WishPopoupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishPopoupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishPopoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
