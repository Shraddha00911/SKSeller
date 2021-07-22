import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {FlashDealRequest,AppBannerRequestDC,
  NotificationRequest,MurliRequest,BrandStoreRequest } from 'src/app/grow-business/interfaces/growbusiness'
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { GrowBusinessService } from '../../services/growbusiness.service';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-brand-store',
  templateUrl: './brand-store.component.html',
  styleUrls: ['./brand-store.component.scss']
})
export class BrandStoreComponent implements OnInit {
   minDate:any=moment().format('LLLL');

  brandStoreRequest:BrandStoreRequest;
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
  file:any;
  imagePath:any;
  imgURL:any;
  selectedWarehouseid=[];
  categoryList=[];
  uploadFlag:boolean=true;
  isInvalid:boolean
  imageError:string;

  constructor(private router:Router, private growbusinessService:GrowBusinessService,
    private cityservice:CityService, private dashboardservice:DashboardService,
    private messageService:MessageService) { 
      this.dataset = [];
      this.Searchcityids = {};
      this.baseURL = environment.apiBaseUrl;
    } 
   
  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.brandStoreRequest={
      ImageUrl :null,
      StartDate :null,
      EndDate :null,
      SubCatId :null,
      WarehouseIds :null,
      Comment :null,
      ApprovedDate :null,
      IsApproved :null,
      ApprovedBy :null,
      CategoryId:null
    }
    this.blocked = false;
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
      this.blocked = false;
    });
    this.CategoryList();
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
  
  onSave(brandStoreForm){
     if (brandStoreForm.form.status == "VALID") {
        this.brandStoreRequest.WarehouseIds=this.selectedWarehouseid;
        this.brandStoreRequest.SubCatId=this.subcateid;
        this.growbusinessService.postBrandStoreReq(this.brandStoreRequest).subscribe(res=>{
          debugger
          console.log(res);
          if(res.Result){
            alert(res.msg);
            this.router.navigateByUrl('/growbusiness/growbusinesslist');
          }
          else{
            alert(res.msg);
          }
        }) 
      }else{
    this.isInvalid=true;
    if(!this.dataset.cityid){
    this.messageService.add({ severity: 'error', summary: 'please choose city', detail: '' });
    }
    else if(!this.brandStoreRequest.WarehouseIds){
    this.messageService.add({ severity: 'error', summary: 'please choose hub', detail: '' });
    }
    else if(this.uploadFlag==true){
      this.messageService.add({ severity: 'error', summary: 'please upload Image', detail: '' });
    }
     
  }
  
}

upload(file: File[]) {
  debugger
  const allowed_types = ['image/png', 'image/jpeg'];
  this.file = file;
  var reader = new FileReader();
  if (!_.includes(allowed_types, file[0].type)) {
    this.imageError = 'Only Images are allowed ( JPG | PNG )';
    alert(this.imageError);
    this.uploadFlag=false;
    return false;
  }
  else{
    this.uploadFlag=true;
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log(this.imgURL, 'urlimg')
    }
    (success) => {
      alert("image uploaded successfully")
    };
  }
 
}



uploadImage(){
  debugger
  if (!this.file) {
    this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
    return
  }
  if (this.file) {
    let formData = new FormData();
    formData.append('file', this.file[0], 'brandstore.jpg')
    this.growbusinessService.uploadImage(formData).subscribe(result => {
      console.log(result)
      this.brandStoreRequest.ImageUrl = result;
      this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
      this.file = [];
      this.uploadFlag = false;
    }, (err) => {
    });
  }
}

selectedwarehouse(){
  var a = [];
  this.selectedWarehouseid = [];
  console.log("this.selectedWarehouseId", this.brandStoreRequest.WarehouseIds)
  this.brandStoreRequest.WarehouseIds.forEach(element => {
    element.WareHouseId
    console.log(element.WareHouseId);
    a.push(element.WareHouseId);
  });
  this.selectedWarehouseid = a;
}

CategoryList(){
  this.growbusinessService.getCategoryList(this.subcateid).subscribe(res=>{
    this.categoryList=res;
    console.log(res,'res');
  })
}
}
