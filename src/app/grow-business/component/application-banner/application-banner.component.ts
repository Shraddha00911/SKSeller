import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FlashDealRequest, AppBannerRequestDC,
  NotificationRequest, MurliRequest, BrandStoreRequest
} from 'src/app/grow-business/interfaces/growbusiness'
import { GrowBusinessService } from '../../services/growbusiness.service';

import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-application-banner',
  templateUrl: './application-banner.component.html',
  styleUrls: ['./application-banner.component.scss']
})
export class ApplicationBannerComponent implements OnInit {
  minDate: any = moment().format('LLLL');
  subcateid: any;
  subcateName: any;
  appBannerRequestDC: AppBannerRequestDC;
  CityList = [];
  blocked: boolean;
  Searchcityids: any;
  wareHouseList = []
  cityid: any;
  dataset: any;
  baseURL: any;
  warehouse: any;
  file: any;
  public imagePath;
  imgURL: any;
  selectedWarehouseid = [];
  isInvalid: boolean;
  imageError:string;
  uploadFlag:boolean=true;
  constructor(private router: Router, private growbusinessService: GrowBusinessService,
    private cityservice: CityService, private dashboardservice: DashboardService,
    private messageService: MessageService) {
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
    this.appBannerRequestDC = {
      ImageUrl: null,
      StartDate: null,
      EndDate: null,
      SubCatId: null,
      WarehouseIds: null,
      Comment: null,
      ApprovedDate: null,
      IsApproved: null,
      ApprovedBy: null,
      Type: null,
      AppBannerDiscription: null
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
  // }
  onSave(apBannerForm) {
    if (!this.appBannerRequestDC.ImageUrl) {
      this.messageService.add({ severity: 'error', summary: 'please upload Image', detail: '' });
      return false;
    }
    if (apBannerForm.form.status == "VALID") {
      this.appBannerRequestDC.WarehouseIds = this.selectedWarehouseid;
      this.appBannerRequestDC.SubCatId = this.subcateid;
      this.blocked = true;
      this.growbusinessService.postAppBannerReq(this.appBannerRequestDC).subscribe(res => {
        debugger
        this.blocked = false;
        console.log(res);
        if (res.Result) {
          alert(res.msg);
          this.router.navigateByUrl('/growbusiness/growbusinesslist');
        }
        else {
          alert(res.msg);
        }
      })
    }
    else {
      this.isInvalid = true;
      if (!this.dataset.cityid) {
        this.messageService.add({ severity: 'error', summary: 'please choose city', detail: '' });
      }
      else if (!this.appBannerRequestDC.WarehouseIds) {
        this.messageService.add({ severity: 'error', summary: 'please choose hub', detail: '' });
      }
      else if (!this.appBannerRequestDC.ImageUrl) {
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
  


  uploadImage() {
    debugger
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'appbanner.jpg')
      this.blocked = true;

      this.growbusinessService.uploadImage(formData).subscribe(result => {
        console.log(result)
        this.blocked = false;

        this.appBannerRequestDC.ImageUrl = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlag = false;
      }, (err) => {
      });
    }
  }

  selectedwarehouse() {
    var a = [];
    this.selectedWarehouseid = [];
    console.log("this.selectedWarehouseId", this.appBannerRequestDC.WarehouseIds)
    this.appBannerRequestDC.WarehouseIds.forEach(element => {
      element.WareHouseId
      console.log(element.WareHouseId);
      a.push(element.WareHouseId);
    });
    this.selectedWarehouseid = a;
  }

}
