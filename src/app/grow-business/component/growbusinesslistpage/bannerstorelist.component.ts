import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { GrowBusinessService } from '../../services/growbusiness.service';
import { environment } from 'src/environments/environment';
import { MessageService, LazyLoadEvent, ConfirmationService } from 'primeng/api';
import {
  FlashDealRequest, AppBannerRequestDC,
  NotificationRequest, MurliRequest, BrandStoreRequest
} from 'src/app/grow-business/interfaces/growbusiness'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bannerstorelist',
  templateUrl: './bannerstorelist.component.html',
  styleUrls: ['./bannerstorelist.component.scss']
})
export class BannerstorelistComponent implements OnInit {
  brandStoreRequest: BrandStoreRequest;
  murliRequest: MurliRequest;
  notificationRequest: NotificationRequest;
  flashDealRequest: FlashDealRequest;
  appBannerRequestDC: AppBannerRequestDC;
  public notificationList = [];
  baseURL: any;
  skip = 0;
  take = 10;
  flashDealList = [];
  brandStoreList = [];
  appBannerList = [];
  murliList = [];
  startdate: Date;
  enddate: Date;
  warehouseId: number;
  RequestType: number;
  CityList = [];
  Searchcityids: any;
  wareHouseList = []
  cityid: any;
  dataset: any;
  blocked: boolean;
  searchitem: any;
  growBusinessHistoryDcs: any;
  opendetailspopup: boolean;
  Id: number;
  growBusinessDetails: any;
  totalcount: any;
  uploadFlag: boolean = true;
  file: any;
  public imagePath;
  imgURL: any;
  selectedHub: any;
  seleware: any;
  searchListrecord: any;
  IsExportable: boolean;
  IsMurliFile: boolean = false;
  subcateName: string;
  subcateid: any;
  ItemList: any[];
  ItemTable: boolean;
  MaxQty: boolean;
  AvailableQty: boolean;
  IsFlashDealPrice: boolean;
  Moq: boolean;
  ItemName: boolean;
  Rowpopup: boolean;
  ExportHistoryData: any;
  IsUpdateDisable: boolean;
  StatusValue:string;
  constructor(private router: Router, private growbusinessService: GrowBusinessService,
    private cityservice: CityService, private dashboardservice: DashboardService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, private ExportService: ExportServiceService) {
    this.dataset = [];
    this.Searchcityids = {};
    this.searchitem = {};
    this.searchListrecord = {};
    this.baseURL = environment.apiBaseUrl;
  }

  ngOnInit(): void {

    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
    this.IsExportable = JSON.parse(localStorage.getItem('IsExportable'));

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
  getGrowBusinesslist() {
 
    this.warehouseId = this.seleware;
    this.searchListrecord.skip = this.skip;
    this.searchListrecord.take = this.take;
    this.searchListrecord.RequestType = this.RequestType;
    this.searchListrecord.startdate = this.startdate;
    this.searchListrecord.enddate = this.enddate;
    this.searchListrecord.StatusValue = this.StatusValue;
    let WarehouseIds = [];
    for (var i in this.selectedHub) {
      WarehouseIds.push(this.selectedHub[i].WareHouseId)
    }
    this.searchListrecord.WarehouseIds = WarehouseIds;

    if (!this.searchListrecord.RequestType) {
      this.messageService.add({ severity: 'error', summary: 'Please select RequestType First!', detail: '' });

    } else {
      this.blocked = true;
      this.growBusinessHistoryDcs = null;
      this.totalcount = 0;
      this.growbusinessService.getGrowBusinessList(this.searchListrecord).subscribe(res => {
        this.blocked = false;
        
        console.log(res, 'res');
        
        this.growBusinessHistoryDcs = res.GrowBusinessHistoryDcs;
        this.totalcount = res.totalcount;
        if (this.growBusinessHistoryDcs[0].ReqTypeName == "Murli") {
          this.IsMurliFile = true;
        }
        else {
          this.IsMurliFile = false;
        }
        this.messageService.add({ severity: 'success', summary: 'Searched Records', detail: '' });
      })
    }
  }
  modo(e) {
 
    e.RequestType;
    this.growBusinessHistoryDcs = [];
  }

  edit(listdata) {
    this.opendetailspopup = true;
    this.Id = listdata.Id;
    if (listdata.ReqTypeName == 'AppBanner') {
      this.RequestType = 1;
    }
    if (listdata.ReqTypeName == 'Notification') {
      this.RequestType = 2;
    }
    if (listdata.ReqTypeName == 'Flashdeal') {
      this.RequestType = 3;
    }
    if (listdata.ReqTypeName == 'BrandStore') {
      this.RequestType = 4;
    }
    if (listdata.ReqTypeName == 'Murli') {
      this.RequestType = 5;
    }
    this.blocked = true;
    this.growBusinessDetails = null;
    this.growbusinessService.getGrowBusinessDetails(this.RequestType, this.Id).subscribe(res => {
      this.blocked = false;
      console.log(res, 'res', 'growBusinessDetails');
      this.growBusinessDetails = res;
    
      this.ItemList = res.FlashDealItemsDcs;

      if (this.ItemList.length > 0) {
        this.ItemTable = true;
        this.AvailableQty = false;
        this.MaxQty = false;
        this.IsFlashDealPrice = false;
        this.Moq = false;
        this.ItemName = false;
        // this.IsUpdateDisable=false;
      }
      else {
        this.ItemTable = false;
        this.AvailableQty = true;
        this.MaxQty = true;
        this.IsFlashDealPrice = true;
        this.Moq = true;
        this.ItemName = true;
        // this.IsUpdateDisable=true;
      }
    })
  }
  Remove(Id, item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.ItemList.splice(item, 1)
        this.growbusinessService.DeleteItemRow(Id).subscribe(res => {
          alert("Item Deleted");
          if (this.ItemList.length == 0) {
            this.IsUpdateDisable = true;
          }
        })
      }
    })
  }
  Export(): void {
    if (!this.RequestType) {
      this.messageService.add({ severity: 'error', summary: 'Please select RequestType First!', detail: '' });

    }
    else if (!this.startdate) {
      this.messageService.add({ severity: 'error', summary: 'Please select startdate!', detail: '' });

    }
    else if (!this.enddate) {
      this.messageService.add({ severity: 'error', summary: 'Please select endDate!', detail: '' });

    }
    else if (!this.dataset.cityid) {
      this.messageService.add({ severity: 'error', summary: 'Please select City !', detail: '' });

    }
    // else if (!this.warehouseId) {
    //   this.messageService.add({ severity: 'error', summary: 'Please select warehouse!', detail: '' });

    // }
    else {

      this.searchListrecord.RequestType = this.RequestType;
      this.searchListrecord.startdate = this.startdate;
      this.searchListrecord.enddate = this.enddate;
      let WarehouseIds = [];
      for (var i in this.selectedHub) {
        WarehouseIds.push(this.selectedHub[i].WareHouseId)
      }
      var name;
      if (this.RequestType == 1) {
        name = "AppBanner";
      }
      if (this.RequestType == 2) {
        name = "Notification";
      }
      if (this.RequestType == 3) {
        name = "Flashdeal";
      }
      if (this.RequestType == 4) {
        name = "BrandStore";
      }
      if (this.RequestType == 5) {
        name = "Murli";
      }

      this.searchListrecord.WarehouseIds = WarehouseIds;
      this.blocked = true;

      this.growbusinessService.exportAsExcelFile(this.searchListrecord).subscribe(res => {
        this.blocked = false;
        if (res.AppBannerHistoryExportDcs != null) {
          this.ExportHistoryData = res.AppBannerHistoryExportDcs;
        }
        if (res.NotificationHistoryExportDcs != null) {
          this.ExportHistoryData = res.NotificationHistoryExportDcs;
        }
        if (res.FlashDealHistoryExportDcs != null) {
          this.ExportHistoryData = res.FlashDealHistoryExportDcs;
        }
        if (res.MurliHistoryExportDcs != null) {
          this.ExportHistoryData = res.MurliHistoryExportDcs;
        }
        if (res.BrandStoreRHistoryExportDcs != null) {
          this.ExportHistoryData = res.BrandStoreRHistoryExportDcs;
        }

        this.ExportService.exportAsExcelFile(this.ExportHistoryData, name + '_Data')

      });
    }

  }

  loadLazy(event: LazyLoadEvent) {

    setTimeout(() => {
      if (this.growBusinessHistoryDcs) {
        this.skip = event.first;
        this.take = event.rows;

        this.getGrowBusinesslist();
      }
    }, 100);
  }

  updateappbanner() {
  
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // this.messageService.add({ severity: 'success', summary: 'updated successfully', detail: '' });
        if (this.RequestType = 1) {
          this.blocked = true;

          this.growbusinessService.postAppBannerReq(this.growBusinessDetails).subscribe(res => {

            this.blocked = false; alert(res.msg);
            console.log(res)


            this.opendetailspopup = false;
            window.location.reload();

          })
        }
      }
    });
  }


  updatenotification() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // this.messageService.add({ severity: 'success', summary: 'updated successfully', detail: '' });
        if (this.RequestType = 2) {
          this.blocked = true;
          this.growbusinessService.postNotificationReq(this.growBusinessDetails).subscribe(res => {
            this.blocked = false;
            alert(res.msg);
            console.log(res);
            this.opendetailspopup = false;
            window.location.reload();

          })
        }
      }
    });

  }

  updateflashdeal() {
    for (let i of this.ItemList) {
      if (i.FlashDealPrice > i.MRP) {
        alert("FlashDeal Price Cannot be Greater than MRP");
        return;
      }
    }
    // this.growBusinessDetails.AvailableQty = this.growBusinessDetails.AvailableQty * this.growBusinessDetails.Moq;
    // this.growBusinessDetails.MaxQty = this.growBusinessDetails.MaxQty * this.growBusinessDetails.Moq;

    if (this.ItemList.length == 0 && this.growBusinessDetails.AvailableQty == 0) {

      this.messageService.add({ severity: 'error', summary: 'please enter limited qty  in multiple moq', detail: '' });
      return;
    }
    if (this.ItemList.length == 0 && this.growBusinessDetails.MaxQty == 0) {

      this.messageService.add({ severity: 'error', summary: 'please enter max qty in multiple moq', detail: '' });
      return;
    }
    if (this.ItemList.length == 0 && (this.growBusinessDetails.FlashDealPrice == 0 || this.growBusinessDetails.FlashDealPrice == "" || this.growBusinessDetails.FlashDealPrice == undefined)) {

      this.messageService.add({ severity: 'error', summary: 'please enter Flash Deal Price', detail: '' });
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // this.messageService.add({ severity: 'success', summary: 'updated successfully', detail: '' });
        if (this.RequestType = 3) {
          this.blocked = true;
      
          this.growBusinessDetails.FlashDealRequestItems = this.ItemList;
          this.growbusinessService.postFlashDealReq(this.growBusinessDetails).subscribe(res => {

            this.blocked = false; alert(res.msg);
            console.log(res)
            this.opendetailspopup = false;
            window.location.reload();

          })
        }
      }
    });
  }


  updatebrandstore() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // this.messageService.add({ severity: 'success', summary: 'updated successfully', detail: '' });
        if (this.RequestType = 4) {
          this.blocked = true;
          this.growbusinessService.postBrandStoreReq(this.growBusinessDetails).subscribe(res => {

            this.blocked = false; alert(res.msg);
            console.log(res)
            this.opendetailspopup = false;
            window.location.reload();

          })
        }
      }
    });
  }

  updatemurli() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // this.messageService.add({ severity: 'success', summary: 'updated successfully', detail: '' });
        if (this.RequestType = 5) {
          this.blocked = true;
          this.growbusinessService.postMurliReq(this.growBusinessDetails).subscribe(res => {

            this.blocked = false; alert(res.msg);
            console.log(res)
            this.opendetailspopup = false;
            window.location.reload();

          })
        }
      }
    });
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
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


  uploadImage() {
  
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'image.jpg')
      this.blocked = true;

      this.growbusinessService.uploadImage(formData).subscribe(result => {
        console.log(result)
        this.blocked = false;
        this.growBusinessDetails.ImageUrl = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlag = false;
      }, (err) => {
      });
    }
  }

  selectedwarehouse() {
   
    this.seleware = [];
    for (var i in this.selectedHub) {
      this.seleware.push(this.selectedHub[i].WarehouseId);
    }
  }



  Cancel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.growbusinessService.calcleReq(this.RequestType, this.Id).subscribe(res => {

          this.blocked = false;
          // console.log(res, 'res');
          // alert(res.msg);
          this.opendetailspopup = false;
          window.location.reload();

        })
      }
    });
  }
}