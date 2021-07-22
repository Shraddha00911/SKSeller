import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-popup',
  templateUrl: './mobile-popup.component.html',
  styleUrls: ['./mobile-popup.component.scss']
})
export class MobilePopupComponent implements OnInit {
  @Input() section: any;
  @Input() popupType: any;
  constructor() { }

  ngOnInit() {
    console.log(this.section);
  }

}