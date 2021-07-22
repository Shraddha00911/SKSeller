import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './component/notification/notification.component';
import { ApplicationBannerComponent } from './component/application-banner/application-banner.component';
import { MurliComponent } from './component/murli/murli.component';
import { FlashDealComponent } from './component/flash-deal/flash-deal.component';
import { BrandStoreComponent } from './component/brand-store/brand-store.component';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BannerstorelistComponent } from './component/growbusinesslistpage/bannerstorelist.component';

const routes: Routes = [
  { path: 'notification', component: NotificationComponent },
  { path: 'application-banner', component: ApplicationBannerComponent },
  { path: 'murli', component: MurliComponent },
  { path: 'flash-deal', component: FlashDealComponent },
  { path: 'brand-store', component: BrandStoreComponent },
  { path: 'growbusinesslist', component: BannerstorelistComponent },
]

@NgModule({
  declarations: [NotificationComponent, ApplicationBannerComponent, MurliComponent, FlashDealComponent, BrandStoreComponent,  BannerstorelistComponent,  ],
  imports: [
    CommonModule,
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ]
})
export class GrowBusinessModule { }
