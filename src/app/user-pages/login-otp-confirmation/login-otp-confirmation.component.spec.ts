import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtpConfirmationComponent } from './login-otp-confirmation.component';

describe('LoginOtpConfirmationComponent', () => {
  let component: LoginOtpConfirmationComponent;
  let fixture: ComponentFixture<LoginOtpConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOtpConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOtpConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
