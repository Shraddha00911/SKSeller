import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetstockComponent } from './netstock.component';

describe('NetstockComponent', () => {
  let component: NetstockComponent;
  let fixture: ComponentFixture<NetstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
