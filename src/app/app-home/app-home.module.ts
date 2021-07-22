import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './components/app-home/app-home.component';
import { FlashDealComponent } from './components/flash-deal/flash-deal.component';
import { MobileBannerComponent } from './components/mobile-view/mobile-banner/mobile-banner.component';
import { MobilePopupComponent } from './components/mobile-view/mobile-popup/mobile-popup.component';
import { MobileTileComponent } from './components/mobile-view/mobile-tile/mobile-tile.component';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ColorPickerModule} from 'primeng/colorpicker';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { AppHomeBannerComponent } from './components/banner/apphome-banner.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'primeng/carousel';
import { AppHomePopupComponent } from './components/popup/apphome-popup.component';
import { AppHomeTileComponent } from './components/tile/apphome-tile.component';
import { Tab } from './components/tabsets/tab';
import { Tabset } from './components/tabsets/tabset';

@NgModule({
  declarations: [AppHomeComponent, AppHomeBannerComponent, FlashDealComponent,  MobileBannerComponent, MobilePopupComponent, MobileTileComponent,AppHomePopupComponent
    ,AppHomeTileComponent,Tab, Tabset],
  imports: [
    CommonModule,
    AppHomeRoutingModule,
    SellerExportSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    CarouselModule,
    ColorPickerModule,
    ToggleButtonModule,
    AccordionModule,
    TabViewModule,
    CarouselModule,
  ]
})
export class AppHomeModule { }
