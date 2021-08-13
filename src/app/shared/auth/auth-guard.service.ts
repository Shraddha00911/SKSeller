// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {

//   constructor() { }
// }

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStogareService } from '../services/local-stogare.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, public router: Router, public localStogareService: LocalStogareService
  ) { }
  menu: any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('state.url', state.url);
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/user-pages/login');
      return false;
    }

    // this.menu = localStorage.getItem('Menus');
    // let isPresent = this.menu.find(x => x.path == state.url);
    // if (!isPresent) {
    //   this.router.navigateByUrl('/error-pages/404');
    //   return false;
    // }
    return true;
  }
}

