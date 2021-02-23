
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
const EXCEL_EXTENSION = '.xlsx';
import { CityService } from '../../../shared/services/dashboard/city.service';
import { ItemschemeService } from '../../services/itemscheme.service';
import { SubcatmappingService } from '../../../user-pages/services/subcatmapping.service';
//import * as FileSaver from 'file-saver';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
// import { data, FormControl } from "./form-data";
import { environment } from '../../../../environments/environment';
import { ItemSchemeMasterDc } from '../../interface/item-scheme-masterdetails-dc';

@Component({
  selector: 'app-itemschememasterdetail',
  templateUrl: './itemschememasterdetail.component.html',
  styleUrls: ['./itemschememasterdetail.component.scss']
})
export class ItemschememasterdetailComponent implements OnInit {
  BrandName: string;
  blocked: boolean;
  IsActive: boolean;
  IsApproved: boolean;
  OfferIds: string;

  ItemschemMasterDetailscols = [
    { field: "ItemNumber", header: "Number" },
    { field: "CompanyCode", header: "Code" },
    { field: "CompanyStockCode", header: "StockCode" },
    { field: "ItemName", header: "Name" },
    { field: "MRP", header: "MRP" },
    { field: "PTR", header: "PTR %" },
    { field: "BaseScheme", header: "BaseScheme %" },
    { field: "onvoiceMargin", header: "onvoiceMargin" },
    { field: "offinvoicemargin", header: "offinvoicemargin" },
    { field: "IsActive", header: "IsActive" }
  ];
  ItemschemFreebiescols = [
    { field: "ItemName", header: "Name" },
    { field: "BaseItemQty", header: "BaseItemQty" },
    { field: "ItemCompanyCode", header: "Code" },
    { field: "ItemCompanyStockCode", header: "StockCode" },
    { field: "MRP", header: "MRP" },
    { field: "Qty", header: "Qty" },
    { field: "StockQty", header: "StockQty" },
  ];
  ItemschemSlabcols = [
    { field: "SlabScheme", header: "Slab Scheme %" },
    { field: "SlabPurchaseQTY", header: "Qty/MOQ" }

  ];
  PostObj: Array<{ ItemSchemeDetailId: number, ItemSchemeMasterId: number, IsActive: boolean }> = [];
  selectedRows: any[];
  ItemschemMaster: {};
  ItemschemMasterDetails: [];
  ItemschemFreebies: [];
  ItemschemSlab: [];
  display: boolean;
  displayFreeBies: boolean;
  displaySlab: boolean;
  ItemschemDetail: any;
  MasterId: number;
  baseURL: any;
  ItemSchemeMasterDc: ItemSchemeMasterDc[];
  constructor(private router: Router, private r: ActivatedRoute, private ItemschemeService: ItemschemeService, private confirmationService: ConfirmationService, private messageService: MessageService,) { this.baseURL = environment.apiBaseUrl; }
  ngOnInit() {
    this.r.params.subscribe(param => {
      if (param && param.Id > 0) {
        this.ItemschemMaster = param;
        this.ItemschemeService.getItemSchemeMasterById(param.Id).subscribe(x => {
          if (x && x.Id > 0) {
            this.BrandName = x.BrandName;
            this.MasterId = x.Id;
            this.IsApproved = x.IsApproved
            this.IsActive = x.IsActive
            this.ItemschemMaster = x;
            this.ItemSchemeMasterDc = x;
            this.ItemschemMasterDetails = x.ItemSchemeDetails;
          }
        });
      }
    })
  }
  back() {
    this.router.navigateByUrl('/itemscheme/Itemschememaster')
  }
  selectRow(checkValue) {
    if (checkValue) {
      this.selectedRows = this.ItemschemMasterDetails;
    } else {
      this.selectedRows = [];
    }
  }

  Approve() {

    if (this.selectedRows && this.selectedRows.length > 0) {
      if (this.selectedRows && this.selectedRows.length > 0) {
        this.PostObj = [];
        for (let index = 0; index < this.selectedRows.length; index++) {
          this.PostObj.push({ ItemSchemeDetailId: this.selectedRows[index].Id, ItemSchemeMasterId: this.selectedRows[index].ItemSchemeMasterId, IsActive: true });
        }
      }
      if (this.PostObj && this.PostObj.length > 0) {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.blocked = true;
            this.ItemschemeService.PostApproveItemSchemMaster(this.PostObj).subscribe(x => {
              this.blocked = false;
              alert(x);
              if (x) {
                this.messageService.add({ severity: 'success', summary: x, detail: '' });
                window.location.reload();
              }
            });
          }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Please select atleast one checkbox to approve scheme', detail: '' });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please select atleast one checkbox to approve scheme', detail: '' });

    }
  }
  Reset() {
    window.location.reload();

  }
  DeactiveItemSchem(item) {

    if (item && item.Id > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemschemeService.DeActivateSchemeDetail(item.ItemSchemeMasterId, item.Id).subscribe(res => {
            this.blocked = false;
            if (res) {
              alert(res);
              window.location.reload();
            }
            else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }
  }

  DeactiveItemSchemMaster() {

    if (this.ItemschemMaster && this.MasterId > 0) {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemschemeService.DeActivateSchemeMaster(this.MasterId).subscribe(res => {

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
  opendisplaySlab(row) {

    this.ItemschemSlab = row.Slabs;
    this.displaySlab = true;
    this.ItemschemFreebies = [];
    this.displayFreeBies = false;
  }
  opendisplayFreeBies(row) {

    this.ItemschemSlab = [];
    this.displaySlab = false;
    this.OfferIds = row.OfferIds;
    this.ItemschemFreebies = row.ItemSchemeFreebiess;

    this.displayFreeBies = true;
  }

  DeActivateFreebiesByDetailId(row) {

    if (row) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action? to Deactivate FreeBies',
        accept: () => {
          this.blocked = true;
          this.ItemschemeService.DeActivateFreebiesByDetailId(this.MasterId, row).subscribe(res => {

            alert(res);
            this.blocked = false;
            if (res) {

              window.location.reload();
            } else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }
  }

}

