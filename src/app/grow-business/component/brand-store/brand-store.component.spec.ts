import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStoreComponent } from './brand-store.component';

describe('BrandStoreComponent', () => {
  let component: BrandStoreComponent;
  let fixture: ComponentFixture<BrandStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
