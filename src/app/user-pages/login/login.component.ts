import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Username: string;
  password: string;
  isFormSubmitted: boolean;
  isLoading: boolean;
  constructor(private loginService: LoginService
    , private localStorageService: LocalStogareService
    , private router: Router) { }
  ngOnInit() {
   
    this.isLoading = false;
    if (this.localStorageService.getItemString(this.localStorageService.tokenKey)) 
    {
     
      if (parseInt(localStorage.getItem('SubCatId'))) {
        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.router.navigateByUrl('/user-pages/subcatselection');
      }
    }
  }
  onSubmit(mobileForm: NgForm) {
    
    this.isLoading = true;
    this.loginService.userAuthentication(this.Username, this.password, '1').subscribe((x: any) => {
      alert('login successful');
      this.isLoading = false;
      this.localStorageService.set(this.localStorageService.tokenKey, x);
      localStorage.setItem('sellertokenData', JSON.stringify(x));
      localStorage.setItem('selleruserToken', x.access_token);
      localStorage.setItem('userid', x.userid);
      localStorage.setItem('userName', x.userName);
      localStorage.setItem('SubCatId', "0");
      //this.router.navigateByUrl('/dashboard');
      this.router.navigateByUrl('/user-pages/subcatselection');
    }, error => {
      alert('login error');
    });
  }
}
