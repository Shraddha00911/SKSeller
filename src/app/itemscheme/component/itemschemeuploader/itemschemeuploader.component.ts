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
import { Table, TableModule } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-itemschemeuploader',
  templateUrl: './itemschemeuploader.component.html',
  styleUrls: ['./itemschemeuploader.component.scss']
})
export class ItemschemeuploaderComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  @ViewChild("file", { static: false }) file;
  baseURL: any;
  Id: number = null;
  Cityid: number = null;
  SubSubCategoryId: any;
  cities = [];
  isInvalid: boolean;
  itemschemeuploadedList: any;
  blocked: boolean;
  TotalRecords: any;
  searchModel: any;
  BrandList: any;
  FromDate: any;
  ToDate: any;
  minimumDate: any;
  columns = [
    { field: 'BrandName', header: 'Brand' },
    { field: 'StartDate', header: 'Start' },
    { field: 'EndDate', header: 'End' },
    { field: 'StatusType', header: 'Status' },
    { field: 'CreatedDate', header: 'Created' },
    // { field: 'CreatedBy', header: 'CreatedBy' },
    // { field: 'ApprovedBy', header: 'ApprovedBy' },
    // { field: 'ApprovedDate', header: 'Approved' },
    // { field: 'IsApproved', header: 'IsApproved' },
    { field: 'UploadedSheetUrl', header: 'Sheet' },
    { field: 'ItemSchemeMasterId', header: 'GeneratedId' }

  ];
  subcateid: number;
  subcateName: string;
  constructor(private router: Router, private r: ActivatedRoute, private cityService: CityService, private ItemSchemeService: ItemschemeService, private messageService: MessageService, public SubcatmappingService: SubcatmappingService) { this.searchModel = {}; this.baseURL = environment.apiBaseUrl; }

  ngOnInit() {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    //this.SubSubCategoryId=this.subcateid;
    this.FromDate = new Date();
    this.ToDate = new Date(this.FromDate.setHours(0, 0, 0, 0));
    this.ToDate = new Date();
    this.minimumDate = new Date();
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });

    this.SubcatmappingService.GetAllBrand().subscribe(result => {

      this.BrandList = result;

    })

  }

  Reset() {
    this.Cityid = null;
    this.itemschemeuploadedList = [];
  }
  navigateToDetail(item, event) {

    this.router.navigate(['Itemschemeuploaderdetail', {
      Id: item.Id,
    }], { relativeTo: this.r.parent });

  }

  onBrandChange() {

    if (this.Cityid > 0 && this.SubSubCategoryId > 0) {
      this.searchModel.SubsubCategoryid = this.SubSubCategoryId;
      this.searchModel.cityId = this.Cityid;
      this.dataTableComponent.reset();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Select City', detail: '' });
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
      this.itemschemeuploadedList = [];
      this.TotalRecords = 0;

      this.ItemSchemeService.getUploadedItemScheme(this.searchModel).subscribe(res => {
        this.blocked = false;
        if (res.length > 0) {
          this.itemschemeuploadedList = res;
          this.TotalRecords = res[0].totalRecord;
        }
      });
    } else {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });
    }
  }
  uploadFile(Cityid, SubSubCategoryId) {

    
    if (Cityid > 0 && SubSubCategoryId > 0 && this.file.nativeElement.files.length > 0) {
      var currentTimeInSeconds = Math.floor(Date.now() / 1000);
      let formData = new FormData();
      formData.append('file', this.file.nativeElement.files[0], currentTimeInSeconds + ".xlsx");
      formData.append('CityId', Cityid);
      formData.append('SubSubCatId', this.SubSubCategoryId);
      formData.append('StartDate', this.FromDate);
      formData.append('EndDate', this.ToDate);
      this.blocked = true;
      this.ItemSchemeService.UploadExcel(formData).subscribe(result => {
       // alert(result);
        this.blocked = false;
        if (result && result == "Your Excel data is uploaded succesfully.") 
        {
          this.messageService.add({ severity: 'success', summary: result.toString(), detail: '' });
          window.location.reload();
        }
        else 
        {
          this.messageService.add({ severity: 'error', summary: 'problem in upload file!', detail: '' });
          window.location.reload();
        }
      });
    }
    else if(this.file.nativeElement.files.length == 0)
    {    
        this.messageService.add({ severity: 'error', summary: 'Select file mandatory field!', detail: '' });
  }
    else {
      this.messageService.add({ severity: 'error', summary: 'Select all mandatory field!', detail: '' });
    }
  }
  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      CompanyCode: '',
      CompanyStockCode: '',
      ItemName: '',
      MRP: '',
      PTR: '',
      BaseScheme: '',
      SlabPurchaseQTY1: '',
      SlabScheme1: '',
      SlabPurchaseQTY2: '',
      SlabScheme2: '',
      SlabPurchaseQTY3: '',
      SlabScheme3: '',
      SlabPurchaseQTY4: '',
      SlabScheme4: '',
      BaseItemQty: '',
      ChildItem: '',
      ChildItemCompanycode: '',
      ChildItemCompanyStockcode: '',
      FreeQty: '',
      FreeStockQty: '',
      IsFreeStock: 'Yes/No',
      IncludeBaseSchmForPOPrice: 'Yes/No',
      IncludeOnInvoiceMarginforPoPrice: 'Yes/No',
      IncludeMaxSlabForPOPrice: 'Yes/No',
      onvoiceMargin: '',
      offinvoicemargin: ''
    })


    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(arr);
    let wscols = [{ wpx: 100 }, { wpx: 100 }, { wpx: 100 }];
    worksheet['!cols'] = wscols;
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'SampleFile' + (new Date()).toString());
  } public exportAsExcelFile(json: any[], excelFileName: string): void {

    let wscols = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet['!cols'] = wscols;
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {

    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

}
