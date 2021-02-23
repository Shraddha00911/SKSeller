import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login-via-mobile',
  templateUrl: './login-via-mobile.component.html',
  styleUrls: ['./login-via-mobile.component.scss']
})
export class LoginViaMobileComponent implements OnInit {
  Mobile: number;
  isFormSubmitted: boolean;
  constructor(private loginService: LoginService
    , private localStorageService: LocalStogareService
    , private router: Router) { }

  ngOnInit(): void {
  }

  
}
