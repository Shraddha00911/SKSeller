import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { RouteInfo } from './sidebarmetadata';
import { CityService } from '../../shared/services/dashboard/city.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public uiAdvancedCollapsed = false;
  public formsCollapsed = false;
  public editorsCollapsed = false;
  public chartsCollapsed = false;
  public tablesCollapsed = false;
  public iconsCollapsed = false;
  public mapsCollapsed = false;
  public userPagesCollapsed = false;
  public errorCollapsed = false;
  public generalPagesCollapsed = false;
  public eCommerceCollapsed = false;

  public menuItems: RouteInfo[];
  // dropdown:any;
  apiURL: string;
  SubMenus: any;
  backendURL: string;
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  // logoUrl = 'assets/img/logo.png';
  public config: any = {};
  searchValue = '';
  @Input() navItems: Array<any>;
  @HostBinding('class.sidebar-nav') true;
  @HostBinding('attr.role') role;
  route: string;
  public href: string = "";
  url: string = "asdf"; subcateid: number;
  subcateName: string;
  items: MenuItem;
  itemData: any[] = [];
  data: any[] = [];
  menu: MenuItem[];
  logoUrl:any;
  constructor(private router: Router, private cityservice: CityService) {
    this.backendURL = environment.apiBaseUrl;
  }

  ngOnInit() {

    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    this.logoUrl = localStorage.getItem('SublogoUrl');

    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });


    this.cityservice.getAllPagePermission().subscribe(result => {
      console.log('getAllPagePermission: ', result);
      this.menuItems = [];
      // if (result && result.length > 0) {
      //   result.forEach(item => {
      //     if (item.PageName == "Group 2") {
      //       let module: RouteInfo = {
      //         badge: '',
      //         badgeClass: '',
      //         class: 'has-sub',
      //         icon: 'ft-align-left',
      //         isExternalLink: false,
      //         path: '',
      //         submenu: [],
      //         title: item.PageName
      //       };
      //       if (item.ChildPageDcs != null && item.ChildPageDcs.length > 0) {
      //         item.ChildPageDcs.forEach(cPage => {
      //           let appender = ""
      //           if (!cPage.IsNewPortalUrl) {
      //             appender = this.backendURL + '/#/'
      //           } else {
      //             appender = '/#/'
      //           }
      //           let child: RouteInfo = {
      //             badge: '',
      //             badgeClass: '',
      //             class: cPage.ClassName,
      //             icon: cPage.IconClassName,
      //             isExternalLink: true,
      //             path: cPage.RouteName,
      //             submenu: [],
      //             title: cPage.PageName
      //           };
      //           module.submenu.push(child);
      //         });
      //       }
    
      //       this.menuItems.push(module);

      //       this.SubMenus = this.menuItems[0].submenu;
      //       this.navItems = this.SubMenus;
      //       // if (this.SubMenus) {

      //       //   localStorage.setItem('Menus', this.SubMenus);
      //       // }

      //     }
      //   })
      // }

      // for parenting
      if (result && result.length > 0) {
        this.menu = [];
        result.forEach(item => {
          
          if (item.IsGroup2PortalUrl) {
            let module: RouteInfo = {
              badge: '',
              badgeClass: '',
              class: 'has-sub',
              icon: 'ft-align-left',
              isExternalLink: false,
              path: '',
              submenu: [],
              title: item.PageName
            };
            if (item.ChildPageDcs != null && item.ChildPageDcs.length > 0) {
              this.data = [];
              item.ChildPageDcs.forEach(cPage => {
                let appender = ""
                if (!cPage.IsGroup2PortalUrl) {
                  appender = '/#/'//'/#/error-pages/404'
                }
                else {
                  appender = '/#/'
                }
                let child: RouteInfo = {
                  badge: '',
                  badgeClass: '',
                  class: cPage.ClassName,
                  icon: cPage.IconClassName,
                  isExternalLink: true,
                  path: appender + cPage.RouteName,
                  submenu: [],
                  title: cPage.PageName
                };
                module.submenu.push(child);
                if (item.Id == cPage.ParentId) {
                  let obj = {
                    label: child.title,
                    icon: cPage.IconClassName,
                    url: appender + cPage.RouteName,
                    command: (event) => {
                      
                      this.menu.forEach(x => {
                        
                        let index = -1;
                        if (x.items && x.items.length > 0) {
                          x.items.forEach(sub =>{
                            sub.styleClass ='';
                          })
                        }

                      });

                      event.item.styleClass = 'sel-tb';
                      //event.originalEvent: Browser event
                      //event.item: menuitem metadata
                    }
                  }
                  this.data.push(obj);
                  // console.log('items',this.items);
                }
              });
            }
            this.menuItems.push(module);
            this.items =
            {
              label: module.title,
              icon: '',
              items: this.data,
              command: (event) => {
                console.log('event: ', event);
                this.menu.forEach(x => {
                  
                  // if (x == event.item) {
                  //   x.expanded = true;
                  // } else {
                  //   x.expanded = false;
                  // }

                });
              }
            };
            this.menu.push(this.items);
            console.log('items', this.menu);

          }
        })
      }
      console.log('menuitems', this.menu);


      //this.menuItems = ROUTES;
    });

  }
  isDivider(navItem) {
    return !!navItem.divider
  }

  isTitle(navItem) {
    return !!navItem.title
  }

  isHasChild(navItem) {
    return navItem.hasOwnProperty('children') && navItem.children.length > 0;
  }

}

