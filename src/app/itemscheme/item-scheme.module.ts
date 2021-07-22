import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemschemeuploaderComponent } from './component/itemschemeuploader/itemschemeuploader.component';
import { ItemschemeuploaderdetailComponent } from './component/itemschemeuploaderdetail/itemschemeuploaderdetail.component';
import { ItemschememasterComponent } from './component/itemschememaster/itemschememaster.component';
import { ItemschememasterdetailComponent } from './component/itemschememasterdetail/itemschememasterdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { SellerExportSharedModule } from '../shared/seller-export-shared/seller-export-shared.module';


const routes: Routes = [
  { path: 'Itemschemeuploader', component: ItemschemeuploaderComponent },
  { path: 'Itemschemeuploaderdetail', component: ItemschemeuploaderdetailComponent },
  { path: 'Itemschememaster', component: ItemschememasterComponent },
  { path: 'Itemschememasterdetail', component: ItemschememasterdetailComponent }
]
@NgModule({
  declarations: [
    ItemschemeuploaderComponent,
    ItemschemeuploaderdetailComponent,
    ItemschememasterComponent,
    ItemschememasterdetailComponent,
  ],
  imports: [
    CommonModule,     
    SellerExportSharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ItemSchemeModule { }
