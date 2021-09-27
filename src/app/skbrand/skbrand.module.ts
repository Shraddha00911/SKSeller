import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDashboardComponent } from './component/business-dashboard/business-dashboard.component';
import { CatalogComponent } from './component/catalog/catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
//import { NgSelect2Module } from 'ng-select2';

const routes: Routes = [
  { path: 'businessdashboard', component: BusinessDashboardComponent },
  { path: 'catalog', component: CatalogComponent },
]
@NgModule({
  declarations: [BusinessDashboardComponent, CatalogComponent],
 imports: [
   CommonModule,     
   SellerExportSharedModule,
   RouterModule.forChild(routes),
   ChartsModule,
   ChartistModule,
   NgSelectModule,
   FormsModule,
   //NgSelect2Module
 ]
})

export class SKBrandModule { }
