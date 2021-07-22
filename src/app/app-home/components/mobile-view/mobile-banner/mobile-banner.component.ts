import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mobile-banner',
  templateUrl: './mobile-banner.component.html',
  styleUrls: ['./mobile-banner.component.scss']
})
export class MobileBannerComponent implements OnInit {
  @Input() section: any;
  @Input() bannerType: any;
  // baseURL: any;
  
  constructor() { 
    // this.baseURL = environment.apiBaseUrl;
  }

  ngOnInit() {
  }

}
