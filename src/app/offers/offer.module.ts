import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { AddofferComponent } from './components/addoffer/addoffer/addoffer.component';
import { OfferlistComponent } from './components/offerlist/offerlist/offerlist.component';

const routes: Routes = [
  { path: 'addoffer', component: AddofferComponent },
  { path: 'offerlist', component: OfferlistComponent },

]
@NgModule({
  declarations: [AddofferComponent, OfferlistComponent],
  imports: [
    CommonModule,
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ]
})
export class OfferModule { }

