import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { LedgerComponent } from './component/ledger/ledger.component';
import { PaymentComponent } from './component/payment/payment/payment.component';

const routes: Routes = [
   { path: 'ledger', component: LedgerComponent },
   { path: 'payment', component: PaymentComponent },
]
@NgModule({
  declarations: [LedgerComponent, PaymentComponent],
  imports: [
    CommonModule,     
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AccountsModule { }
