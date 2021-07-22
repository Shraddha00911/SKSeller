import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  FlashDealRequest, AppBannerRequestDC,
  NotificationRequest, MurliRequest, BrandStoreRequest
} from 'src/app/grow-business/interfaces/growbusiness'
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { GrowBusinessService } from '../../services/growbusiness.service';
import { environment } from 'src/environments/environment';
import { OfferService } from 'src/app/offers/services/offer.service';
import moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-flash-deal',
  templateUrl: './flash-deal.component.html',
  styleUrls: ['./flash-deal.component.scss']
})
export class FlashDealComponent implements OnInit {
  minDate: any = moment().format('LLLL');
  subcateid: any;
  subcateName: any;
  flashDealRequest: FlashDealRequest;
  CityList = [];
  blocked: boolean;
  Searchcityids: any;
  wareHouseList = []
  cityid: any;
  dataset: any;
  baseURL: any;
  warehouse: any;
  file: any;
  imagePath: any;
  imgURL: any
  ItemsList = [];
  selectedWarehouseid = [];
  itemName: any;
  MoqList = [];
  uploadFlag: boolean = true;
  isInvalid: boolean;
  minOrderQty: any;
  propervalueFlag: boolean = false;
  propermaxvalueFlag: boolean = false;
  imageError: string;

  addItemList: Item[] = [];
  IsSendButton: boolean = false;
  constructor(private router: Router, private growbusinessService: GrowBusinessService,
    private cityservice: CityService, private dashboardservice: DashboardService,
    private messageService: MessageService, private offerservice: OfferService) {
    this.dataset = [];
    this.Searchcityids = {};

    this.flashDealRequest = {
      ImageUrl: null,
      StartDate: null,
      EndDate: null,
      SubCatId: null,
      WarehouseIds: null,
      Comment: null,
      ApprovedDate: null,
      IsApproved: null,
      ApprovedBy: null,
      ItemId: null,
      AvailableQty: null,
      MaxQty: null,
      FlashDealPrice: null,
      FlashDealRequestItems: null
    }
    this.baseURL = environment.apiBaseUrl;
  }
  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.blocked = false;
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
      this.blocked = false;
    });
    // this.getItem();
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
        console.log(this.wareHouseList, 'ff');
      });
    } else { alert("Please city "); this.blocked = false; }
  }
  onSave(flashdealForm) {
    if (this.flashDealRequest.AvailableQty % this.minOrderQty != 0) {
      this.messageService.add({ severity: 'error', summary: 'please enter limited qty in multiple moq', detail: '' });
    }
    else if (this.flashDealRequest.MaxQty % this.minOrderQty != 0) {
      this.messageService.add({ severity: 'error', summary: 'please enter max qty in multiple moq', detail: '' });
    }
    else if (flashdealForm.form.status == "VALID") {
      this.flashDealRequest.WarehouseIds = this.selectedWarehouseid;
      this.flashDealRequest.SubCatId = this.subcateid;
      this.flashDealRequest.FlashDealRequestItems = this.addItemList;
      this.blocked = true;
      this.growbusinessService.postFlashDealReq(this.flashDealRequest).subscribe(res => {
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
      else if (!this.flashDealRequest.WarehouseIds) {
        this.messageService.add({ severity: 'error', summary: 'please choose hub', detail: '' });
      }
      // else if (this.uploadFlag == true) {
      //   this.messageService.add({ severity: 'error', summary: 'please upload Image', detail: '' });
      // }
    }
  }
  upload(file: File[]) {
    const allowed_types = ['image/png', 'image/jpeg'];
    this.file = file;
    var reader = new FileReader();
    if (!_.includes(allowed_types, file[0].type)) {
      this.imageError = 'Only Images are allowed ( JPG | PNG )';
      alert(this.imageError);
      this.uploadFlag = false;
      return false;
    }
    else {
      this.uploadFlag = true;
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
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'flashdeal.jpg')
      this.growbusinessService.uploadImage(formData).subscribe(result => {
        console.log(result)
        this.flashDealRequest.ImageUrl = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlag = false;
      }, (err) => {
      });
    }
  }
  getItem() {
    if (this.dataset != null) {
      this.blocked = true;
      this.offerservice.GetFirstHubItem(this.dataset.cityid[0].Cityid).subscribe((x: any) => {
        this.blocked = false;
        if (x) {
          this.ItemsList = x;
          console.log(x, 'x');
          this.ItemsList.forEach(el => {
            this.minOrderQty = el.MinOrderQty;
          })
          this.messageService.add({ severity: 'success', summary: "Item found", detail: '' });
        } else {
          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      })
    }
  }
  selectedwarehouse(cityid) {
    var a = [];
    this.selectedWarehouseid = [];
    console.log("this.selectedWarehouseId", this.flashDealRequest.WarehouseIds)
    this.flashDealRequest.WarehouseIds.forEach(element => {
      element.WareHouseId
      console.log(element.WareHouseId);
      a.push(element.WareHouseId);
    });
    this.selectedWarehouseid = a;
    this.getItem();
  }
  selectfield(event) {
    debugger
    event = this.flashDealRequest.AvailableQty;
    if (this.flashDealRequest.AvailableQty % this.minOrderQty == 0) {
      // this.propervalueFlag=false;
      this.isInvalid = false;
    } else {
      // this.propervalueFlag=true;
      this.isInvalid = true;
    }
  }
  selectmaxfield(event) {
    event = this.flashDealRequest.MaxQty;
    debugger
    if (this.flashDealRequest.MaxQty % this.minOrderQty == 0) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
  moqvalue: any;
  UnitPrice: any;
  ItemName:string;
  MRP:any;
  ItemMultiMRPId:any;
  selectedItem(moqval) {
    debugger;
    this.ItemsList;
    this.ItemsList.forEach(el => {
      if (moqval == el.Id) {
        this.moqvalue = el.MinOrderQty;
        this.UnitPrice = el.UnitPrice;
        this.MRP=el.MRP;
        this.ItemName=el.Name;
        this.ItemMultiMRPId=el.ItemMultiMRPId;
      }
    })
  }
  AddItemDt(data) {

    if (this.selectedWarehouseid.length == 0) {
      alert("Select Warehouse");
      return;
    }
    if (data.StartDate == null || data.StartDate == undefined) {
      alert("Select Start Date");
      return;
    }
    if (data.EndDate == null || data.EndDate == undefined) {
      alert("Select End Date");
      return;
    }
    if (data.ItemId == null || data.ItemId == undefined) {
      alert("Select Item");
      return;
    }
    if (data.AvailableQty == null || data.AvailableQty == undefined) {
      alert("Enter Limit Quantity");
      return;
    }
    if (data.MaxQty == null || data.MaxQty == undefined) {
      alert("Enter MaxQty");
      return;
    }
    if (data.FlashDealPrice == null || data.FlashDealPrice == undefined) {
      alert("Enter FlashDeaPrice");
      return;
    }
    if (data.FlashDealPrice != null) {
      if(data.FlashDealPrice > this.MRP){
        alert("FlashDeal Price Cannot be Greater than MRP");
        return;
      }
     
    }
    let obj: any = {
      //Id: 0,
      StartDate: data.StartDate,
      EndDate: data.EndDate,
      Moq: this.moqvalue,
      AvailableQty: data.AvailableQty,
      MaxQty: data.MaxQty,
      FlashDealPrice: data.FlashDealPrice,
      ItemMultiMrpId: this.ItemMultiMRPId,
      ItemId: data.ItemId,
      ItemName:this.ItemName
      //IsApproved:false
    }
    for (let i of this.addItemList) {
      if (data.ItemId == i.ItemId) {
        alert("Item Already Added in List")
        return;
      }
    }

    this.addItemList.push(obj);
    if (this.addItemList != null) {
      this.IsSendButton = true;
    }
    this.flashDealRequest.FlashDealPrice = null
    this.flashDealRequest.MaxQty = null
    this.flashDealRequest.AvailableQty = null
    this.flashDealRequest.StartDate=null
    this.flashDealRequest.EndDate=null
  }
  Remove(item) {
    this.addItemList.splice(item, 1)
    if (this.addItemList.length > 0) {
      this.IsSendButton = true;
    }
    else {
      this.IsSendButton = false;
    }
  }

}

export class Item {
  StartDate: Date
  EndDate: Date
  Moq: number
  AvailableQty: number
  MaxQty: number
  FlashDealPrice: number
  ItemMultiMrpId: number
  ItemId: number
  //IsApproved:boolean
}