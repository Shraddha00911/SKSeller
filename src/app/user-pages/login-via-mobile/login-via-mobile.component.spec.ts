import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViaMobileComponent } from './login-via-mobile.component';

describe('LoginViaMobileComponent', () => {
  let component: LoginViaMobileComponent;
  let fixture: ComponentFixture<LoginViaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginViaMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
