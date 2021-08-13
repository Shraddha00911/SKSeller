import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { LedgerService } from '../../services/ledger.service';


@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  blocked: boolean;
  SearchData: any;
  subcateid: any;
  CityList: any;
  selectedCities: any;
  subcateName: string;
  IsDisplay: boolean;
  columns = [
    { field: 'Warehouse', header: 'Warehouse' },
    { field: 'SaleAmount', header: 'BrandName' },
    { field: 'GrossMargin', header: 'StartDate' },
    { field: 'Margin', header: 'EndDate' },
    { field: 'InventoryDays', header: 'CreatedDate' },
    { field: 'ClosingStock', header: 'CreatedBy' },
  ];
  LedgerList: any;
  LedgerExportList:any;

  constructor(private router: Router, private cityservice: CityService, private exportService: ExportServiceService, private LedgerService: LedgerService,) { this.SearchData = {}; }

  ngOnInit() {

    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.SearchData.StartDate = new Date();
    this.SearchData.StartDate = new Date(this.SearchData.StartDate.setHours(0, 0, 0, 0));
    this.SearchData.EndDate = new Date();
    this.SearchData.SubCatId = this.subcateid;
    this.blocked = true;
    this.cityservice.GetAllCity().subscribe(x => {
      this.blocked = false;
      this.CityList = x;
    });
  }

  Search() {

    let cityids = [];
    for (var i in this.selectedCities) {
      cityids.push(this.selectedCities[i].Cityid)
    }
    if (cityids.length > 0 && this.subcateid > 0) {
      this.SearchData.CityIds = cityids;
      this.blocked = true;
      this.LedgerService.GetBrandLedger(this.SearchData).subscribe((x: any) => {

        this.blocked = false;
        this.LedgerList = x;
      }, error => {
        this.blocked = false;

        alert('Something went wrong ');
      });
    } else {
      alert('Select City');
    }

  }


  Export(event) {
    if(event){this.SearchData.WarehouseId=event.WarehouseId;}
    this.blocked = true;
    this.LedgerService.GetExportWarehouseLedger(this.SearchData).subscribe((x: any) => {
      this.blocked = false;
      
      this.LedgerExportList = x;
      this.exportService.exportAsExcelFile(this.LedgerExportList, 'result');
    }, error => {
      this.blocked = false;
      alert('Something went wrong ');
    });

  }

}

