import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { OfferService } from '../../../services/offer.service';
import { AddOfferDc } from '../../../interface/add-offer-dc';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.scss']
})
export class AddofferComponent implements OnInit {
  blocked: boolean;

  subcateid: any;
  CityList: any;
  selectedCities: any;
  subcateName: string;
  Isitemsrestriction: any;
  AddOffer: AddOfferDc = {
    CityIds: null,
    OfferName: null,
    OfferOn: null,
    start: null,
    end: null,
    DiscountPercentage: 0,
    BillDiscountWallet: 0,
    BillAmount: 0,
    MaxBillAmount: 0,
    MaxDiscount: 0,
    IsMultiTimeUse: false,
    IsUseOtherOffer: false,
    WalletType: null,
    OfferAppType: null,
    SubCatId: null,
    OfferUseCount: null,
    BillDiscountOfferOn: null,
    IsActive: false,
    UserType: null,
    LineItem: 0,
    Description: null,
    itemIds: null,
    NoOffreeQuantity: 0,
    MinOrderQuantity: 0,
    FreeItemLimit: 0,
    FreeItemId: 0,
    ItemId: 0,
    IsDispatchedFreeStock:false,
  };

  ItemsList: any;
  itemData: any;
  selectedItemsList: any;
  constructor(private router: Router, private cityservice: CityService, private exportService: ExportServiceService, private OfferService: OfferService, private messageService: MessageService,) {
    { }
  }

  ngOnInit() {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.AddOffer.start = new Date();
    this.AddOffer.start = new Date(this.AddOffer.start.setHours(0, 0, 0, 0));
    this.AddOffer.end = new Date();
    this.AddOffer.SubCatId = this.subcateid;
    this.blocked = true;
    this.cityservice.GetAllCity().subscribe(x => {
      this.blocked = false;
      this.CityList = x;
    });
  }
  SearchMainItem(OfferON) {

    this.itemData = null;
    debugger;
    if (this.selectedCities.length > 0 && this.subcateid > 0 && OfferON == "Item") {
      this.blocked = true;
      this.OfferService.GetFirstHubItem(this.selectedCities[0].Cityid).subscribe((x: any) => {
        this.blocked = false;
        if (x) {
          this.itemData = x;
         // this.messageService.add({ severity: 'success', summary: "", detail: '' });

        } else {
          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: '' });
      });
    }
  }


  GenerateOffer() {
    debugger;
    console.log(this.AddOffer);
    let cityids = [];
    for (var i in this.selectedCities) {
      cityids.push(this.selectedCities[i].Cityid)
    }
    if (cityids.length > 0 && this.subcateid > 0) {
      if (this.Isitemsrestriction && this.Isitemsrestriction == "Yes" && this.selectedItemsList && this.selectedItemsList.length > 0) {
        let itemIds = [];
        for (var i in this.selectedItemsList) {
          itemIds.push(this.selectedItemsList[i].Id)
        }
        this.AddOffer.itemIds = itemIds;
      }
      if (this.AddOffer && this.AddOffer.OfferOn == "Item") {
        if (this.AddOffer.MinOrderQuantity <= 0) {
          this.messageService.add({ severity: 'error', summary: "Enter Min Order qty", detail: '' });

          return false;

        }
      }


      this.AddOffer.CityIds = cityids;
      this.blocked = true;
      this.OfferService.CreateOffer(this.AddOffer).subscribe((x: any) => {
        this.blocked = false;
        if (x.status) {
          alert(x.msg);
          this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });
          this.router.navigateByUrl('/offer/offerlist');

        } else {
          alert(x.msg);

          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: '' });
      });
    }
  }



  GetItemList(data) {
    this.ItemsList = null;
    debugger;
    if (this.selectedCities.length > 0 && this.subcateid > 0 && data == "Yes") {

      this.blocked = true;
      this.OfferService.GetFirstHubItem(this.selectedCities[0].Cityid).subscribe((x: any) => {
        this.blocked = false;
        if (x) {
          this.ItemsList = x;
          this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });

        } else {
          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: '' });
      });
    }
  }

  Reset() { window.location.reload(); }
}
