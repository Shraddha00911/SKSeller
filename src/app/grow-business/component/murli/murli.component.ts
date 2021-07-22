import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashDealRequest,AppBannerRequestDC,
  NotificationRequest,MurliRequest,BrandStoreRequest } from 'src/app/grow-business/interfaces/growbusiness'
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { GrowBusinessService } from '../../services/growbusiness.service';
import { MessageService } from 'primeng/api';
import moment from 'moment';

@Component({
  selector: 'app-murli',
  templateUrl: './murli.component.html',
  styleUrls: ['./murli.component.scss']
})
export class MurliComponent implements OnInit {
   minDate:any=moment().format('LLLL');
  murliRequest:MurliRequest;
  subcateid:any;
  subcateName:any;
  CityList=[];
  blocked:boolean;
  Searchcityids:any;
  wareHouseList=[]
  cityid:any;
  dataset:any;
  baseURL: any;
  warehouse: any;
  selectedWarehouseid=[];
  isInvalid:boolean;
  constructor(private router:Router, private growbusinessService:GrowBusinessService,
    private cityservice:CityService, private dashboardservice:DashboardService,
    private messageService:MessageService) { 
      this.dataset = [];
      this.Searchcityids = {};
    }
 
  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');


    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    
    this.murliRequest={
      ImageUrl :null,
      StartDate :null,
      EndDate :null,
      SubCatId :null,
      WarehouseIds :null,
      Comment :null,
      ApprovedDate :null,
      IsApproved :null,
      ApprovedBy :null,
      MurliDescription:null,
      MurliNotificationTitle:null
    }
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

 

  onSave(murliForm){
     if (murliForm.form.status == "VALID") {
    this.murliRequest.WarehouseIds=this.selectedWarehouseid;
    this.murliRequest.SubCatId=this.subcateid;
    this.growbusinessService.postMurliReq(this.murliRequest).subscribe(res=>{
      console.log(res);
      if(res.Result){
        alert(res.msg);
        this.router.navigateByUrl('/growbusiness/growbusinesslist');
      }
      else{
        alert(res.msg);
      }
    })
    }
     else{
    this.isInvalid=true;
    if(!this.dataset.cityid){
    this.messageService.add({ severity: 'error', summary: 'please choose city', detail: '' });
    }
    else if(!this.murliRequest.WarehouseIds){
    this.messageService.add({ severity: 'error', summary: 'please choose hub', detail: '' });
    }
  }
  
  }

  selectedwarehouse(){
    var a = [];
    this.selectedWarehouseid = [];
    console.log("this.selectedWarehouseId", this.murliRequest.WarehouseIds)
    this.murliRequest.WarehouseIds.forEach(element => {
      element.WareHouseId
      console.log(element.WareHouseId);
      a.push(element.WareHouseId);
    });
    this.selectedWarehouseid = a;
  }
}
