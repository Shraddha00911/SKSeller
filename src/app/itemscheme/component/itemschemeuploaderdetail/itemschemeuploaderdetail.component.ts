
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
const EXCEL_EXTENSION = '.xlsx';
import { CityService } from '../../../shared/services/dashboard/city.service';
import { ItemschemeService } from '../../services/itemscheme.service';
import { SubcatmappingService } from '../../../user-pages/services/subcatmapping.service';
//import * as FileSaver from 'file-saver';
import {Table, TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@Component({
  selector: 'app-itemschemeuploaderdetail',
  templateUrl: './itemschemeuploaderdetail.component.html',
  styleUrls: ['./itemschemeuploaderdetail.component.scss']
})
export class ItemschemeuploaderdetailComponent implements OnInit {

  constructor(private router: Router, private r: ActivatedRoute, private ItemschemeService: ItemschemeService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ItemschemuplaoderMaster: any;
  ItemschemuplaoderDetails: any;
  ItemschemuplaoderDetail: any;
  ErroItemschemuplaoderDetail: any;
  display: boolean;
  Errordisplay: boolean;
  blocked: boolean;
  BrandName: string;
  MasterId: number;
  baseURL: any;
  Detailscolumns = [
    { field: 'ItemName', header: 'Item' },
    { field: 'CompanyCode', header: 'Code' },
    { field: 'MRP', header: 'MRP' },
    { field: 'CompanyStockCode', header: 'StockCode' },
    { field: 'BaseScheme', header: 'BaseScheme' },
    { field: 'PTR', header: 'PTR' },
    { field: 'FreeChildItem', header: 'Child' },
    { field: 'FreeChildItemCompanyStockcode', header: 'Stockcode' },
    { field: 'ErrorMessage', header: 'Error' },
  ];
  subcateid:number;
  subcateName:string;
  ngOnInit() {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.r.params.subscribe(param => {
      if (param && param.Id > 0) {
        this.blocked = true;
     
        this.ItemschemeService.getUploadedItemSchemeById(param.Id).subscribe(x => {
          this.blocked = false;
       
          if (x) {
            this.BrandName = x.BrandName;
            this.ItemschemuplaoderMaster = x;
            this.MasterId = x.Id;
            this.ItemschemuplaoderDetail = x.ItemSchemeExcelUploaderDetails;
          }
        });

      }
    })
  }
  back() {
    this.router.navigateByUrl('/itemscheme/Itemschemeuploader')
  }
  openErrorDetails(Details) {
 
    this.ErroItemschemuplaoderDetail = Details;
    this.display = false;
    this.Errordisplay = true;

  }

  openDetails(Details) {

    this.ItemschemuplaoderDetails = Details;
    this.Errordisplay = false;
    this.display = true;
  }

  UpdateForReErrorChecking() {

    if (this.MasterId > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemschemeService.UpdateForReErrorChecking(this.MasterId).subscribe(res => {

            this.blocked = false;
            if (res) {
              alert(res);
              window.location.reload();

            } else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }

  }
  navigateToMaster(item) {

    this.router.navigate(['itemschememasterdetails', {
      Id: item.ItemSchemeMasterId,
    }], { relativeTo: this.r.parent });

  }

}

