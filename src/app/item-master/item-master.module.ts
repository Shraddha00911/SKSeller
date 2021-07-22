import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPriceComponent } from './components/edit-price/edit-price.component';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NetstockComponent } from './components/netstock/netstock.component';
import { TargetListComponent } from '../target/component/target-list/target-list.component';

const routes: Routes = [
  { path: 'edit-price', component: EditPriceComponent },
  { path: 'netstock', component: NetstockComponent },
  { path: 'salestarget', component: TargetListComponent },

]

@NgModule({
  declarations: [EditPriceComponent, NetstockComponent,TargetListComponent],
  imports: [
    CommonModule,
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    EditPriceComponent,NetstockComponent
  ]
})
export class ItemMasterModule { }
