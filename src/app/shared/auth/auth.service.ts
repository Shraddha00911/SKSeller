// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }


import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStogareService } from '../services/local-stogare.service';
@Injectable()
export class AuthService {
  token: string;

  constructor(private localStorageService: LocalStogareService) {}

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
//  debugger;
    const token = this.localStorageService.getItemString('selleruserToken');
    // here you can check if user is authenticated or not through his token 
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
}
