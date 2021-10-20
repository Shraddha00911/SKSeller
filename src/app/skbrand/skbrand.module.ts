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
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesComponent } from './component/sales/sales.component';
import { ToastrModule } from 'ngx-toastr';
import { InventoryComponent } from './component/inventory/inventory.component';

//import { NgSelect2Module } from 'ng-select2';
const routes: Routes = [
  { path: 'businessdashboard', component: BusinessDashboardComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'inventory', component: InventoryComponent },
  
]
@NgModule({
  declarations: [BusinessDashboardComponent, CatalogComponent, SalesComponent, InventoryComponent],
 imports: [
   CommonModule,     
   SellerExportSharedModule,
   RouterModule.forChild(routes),
   ChartsModule,
   ChartistModule,
   NgSelectModule,
   FormsModule,
   AngularMultiSelectModule,
   AngularDateTimePickerModule,
   NgbModule,
   ToastrModule.forRoot(),
   
   //NgSelect2Module
 ]
})

export class SKBrandModule { }
