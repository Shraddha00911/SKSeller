import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { GlobalSettingService } from '../services/global-setting.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  UserName: string;
  logoUrl: string = "assets/images/default_Logo.png";
  subcateName:string;
  constructor(config: NgbDropdownConfig, 
    private router: Router, 
    private globalSettingService: GlobalSettingService,
    private _dashBoardService : DashboardService
    ) {
    config.placement = 'bottom-right';

    this._dashBoardService.refreshNavigationPage.subscribe(refresh =>{
      if(refresh){
        this.ngOnInit()
      }
    })
  }

  ngOnInit() {
    this.UserName = localStorage.getItem('userName');
    this.subcateName = localStorage.getItem('subcateName');
    this.logoUrl = "assets/images/default_Logo.png";
    if(localStorage.getItem('SublogoUrl')){
    this.logoUrl = localStorage.getItem('SublogoUrl');
    }

    this.toggleSidebar();

    this.globalSettingService.isChangeSubCategory.subscribe(() => {
      this.UserName = localStorage.getItem('userName');
      this.logoUrl = localStorage.getItem('SublogoUrl');
      this.subcateName = localStorage.getItem('subcateName');

    })
  }

  logout() {
    localStorage.clear();
    // localStorage.removeItem('selleruserToken');
    // localStorage.removeItem('sellertokenData');
    // localStorage.removeItem('userid');
    // localStorage.removeItem('userName');
    // localStorage.removeItem('SubCatId');
    this.router.navigateByUrl('user-pages/login');
  }

  redirectSubcatSelection(){
    location.reload()
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (!this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

}
