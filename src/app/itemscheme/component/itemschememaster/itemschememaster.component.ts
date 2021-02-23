import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { CityService } from '../../../shared/services/dashboard/city.service';
import { ItemschemeService } from '../../services/itemscheme.service';
import { SubcatmappingService } from '../../../user-pages/services/subcatmapping.service';
//import * as FileSaver from 'file-saver';
import {Table, TableModule} from 'primeng/table';


@Component({
  selector: 'app-itemschememaster',
  templateUrl: './itemschememaster.component.html',
  styleUrls: ['./itemschememaster.component.scss']
})
export class ItemschememasterComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  Id: number = null;
  Cityid: number = null;
  SubSubCategoryId: number = null;
  cities = [];
  itemschememasterList = [];
  blocked: boolean;
  TotalRecords: any;
  searchModel: any;
  BrandList: any;
  isInvalid: boolean;
  baseURL: any;
  columns = [
    { field: 'Id', header: 'MasterId' },
    { field: 'BrandName', header: 'BrandName' },
    { field: 'StartDate', header: 'StartDate' },
    { field: 'EndDate', header: 'EndDate' },
    { field: 'CreatedDate', header: 'CreatedDate' },
    { field: 'CreatedBy', header: 'CreatedBy' },
    { field: 'IsActive', header: 'IsActive' },
    { field: 'ApprovedBy', header: 'ApprovedBy' },
    { field: 'ApprovedDate', header: 'ApprovedDate' },
    { field: 'IsApproved', header: 'IsApproved' },
    { field: 'UploadedSheetUrl', header: 'UploadedSheetUrl' }
  ];
  constructor(private router: Router, private r: ActivatedRoute, private cityService: CityService, private ItemschemeService: ItemschemeService,  private messageService: MessageService, public SubcatmappingService: SubcatmappingService) { this.searchModel = {};this.baseURL = environment.apiBaseUrl; }
  ngOnInit() {
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });

    this.SubcatmappingService.GetAllBrand().subscribe(result => {
    
      this.BrandList = result;

    })
  }
  onBrandChange() {
    debugger;
    if (this.Cityid > 0 && this.SubSubCategoryId > 0) 
    {
      this.searchModel.SubsubCategoryid = this.SubSubCategoryId;
      this.searchModel.cityId = this.Cityid;
      this.dataTableComponent.reset();
    }
  }
  load(event) {
   
    this.searchModel.First = event.first;
    this.searchModel.Last = event.rows ? event.first + event.rows : 20;
    var page = this.searchModel.Last / event.rows;
    if (this.Cityid > 0 && this.SubSubCategoryId > 0) {
      this.searchModel.CityId = this.Cityid;
      this.searchModel.SubsubCategoryid = this.SubSubCategoryId;
      this.blocked = true;
      this.itemschememasterList = [];
      this.TotalRecords = 0;

      this.ItemschemeService.getItemSchemeMaster(this.searchModel).subscribe(res => {
      
        this.blocked = false;
        if (res.length > 0) {
          this.itemschememasterList = res;
          this.TotalRecords = res[0].totalRecord;
        }
      });
    }
    // else {
    //   this.blocked = false;
    //   this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });
    // }
  }
  navigateToDetail(item) {

    this.router.navigate(['Itemschememasterdetail', {
      Id: item.Id,
      //  BrandName: item.BrandName
    }], { relativeTo: this.r.parent });

  }
  Reset() {
    this.searchModel.CityId = null;
    this.searchModel.SubSubCategoryId = null;
    this.itemschememasterList = [];
    this.TotalRecords = 0;
  }
}

