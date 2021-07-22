import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapcomponentComponent } from './component/mapcomponent/mapcomponent.component';

import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';

const routes: Routes = [
  { path: 'extracking', component:MapcomponentComponent },
 
]
@NgModule({
  declarations: [MapcomponentComponent],
  imports: [
    // CommonModule,
    // RouterModule.forChild(routes),
    // AgmCoreModule,
    // MultiSelectModule,
    // FormsModule,
    CommonModule,     
    SellerExportSharedModule,
    RouterModule.forChild(routes),
    ]
})
export class MapmoduleModule { }
