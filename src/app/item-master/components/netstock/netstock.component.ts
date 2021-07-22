import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-netstock',
  templateUrl: './netstock.component.html',
  styleUrls: ['./netstock.component.scss']
})
export class NetstockComponent implements OnInit {
  CityList: any; blocked: boolean; Searchcityids: any;
  dataset: any;
  wareHouseList: any;
  NetStockList: any;
  NetStockListCopy:any;
  ExportNetStockListCopy:[];
  subcateid: number;
  subcateName: string;
  WareHouseId:any;
  searchTerm:any;
  NetTotalamount:any;
  constructor(private cityservice: CityService, private exportService: ExportServiceService, private dashboardservice: DashboardService,private router: Router) {
    this.dataset = [];
    this.Searchcityids = {};
  }

  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.NetTotalamount=0;
    this.blocked = false;
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
      this.blocked = false;
    });
  }
  GetCityWarehouse(cityes) {
    let cityids = [];
    for (var i in cityes) {
      cityids.push(cityes[i].Cityid)
    }
    if (cityids) {
      this.Searchcityids.cityids = cityids;
      this.blocked = true;


      this.dashboardservice.GetWarehouseByCityids(this.Searchcityids).subscribe(x => {
        this.blocked = false;
        this.wareHouseList = x;
      });
    } else { alert("Please city "); this.blocked = false; }
  }

  search() 
  {
   
    this.blocked = true;

    this.dashboardservice.StockDetailExport(this.WareHouseId).subscribe(result=>{
              this.blocked = false;

      this.NetStockList=result;
      this.NetStockListCopy=result;
      for (var i = 0; i < this.NetStockListCopy.length; i++) {
        if (this.NetStockListCopy[i].CurrentNetStockAmount) {
           this.NetTotalamount += this.NetStockListCopy[i].CurrentNetStockAmount;
        } 
    }
    })
  }
  Export(){

      this.exportService.exportAsExcelFile(this.NetStockListCopy, 'StockDetailExport');
   
  }
  searchkeyword(): void {
    let term = this.searchTerm;
    this.NetStockList = this.NetStockListCopy.filter(function(tag) {
        return tag.ItemName.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }); 
}
}
