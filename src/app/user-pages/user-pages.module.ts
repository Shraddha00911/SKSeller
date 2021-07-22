import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginViaMobileComponent } from './login-via-mobile/login-via-mobile.component';
import { LoginOtpConfirmationComponent } from './login-otp-confirmation/login-otp-confirmation.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { SubcatselectionComponent } from './subcatselection/subcatselection/subcatselection.component';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'subcatselection', component: SubcatselectionComponent },
  
  // { path: 'changepassword', component: ChangePasswordComponent },
  // { path: 'forgotpassword', component: ForgotPasswordComponent },
  // { path: 'loginviamobile', component: LoginViaMobileComponent },
  // { path: 'loginotpconfirmation', component: LoginOtpConfirmationComponent },
  // { path: 'updatepassword', component: UpdatePasswordComponent },
  // { path: 'register', component: RegisterComponent },
]
@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    UpdatePasswordComponent, 
    ChangePasswordComponent, 
    ForgotPasswordComponent, 
    LoginViaMobileComponent, 
    LoginOtpConfirmationComponent, 
    SubcatselectionComponent,
  ],
  imports: [
    CommonModule,
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UserPagesModule { }
