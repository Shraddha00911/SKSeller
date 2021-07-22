import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { ItemService } from '../../services/item.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { postupdateitemDC } from '../../interface/postupdateitem-dc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {
  cities : any;
  FindItemList: any;
LimitItemList: any;
Statusvalue: boolean;
showdata: boolean;
radiobtn : boolean;
searchDisable : boolean;
selectedItem: any;
CityId: any;
ItemList: any;
subcateName: string;
Cityid : any;
mymodel: any = '';
  mymodel2: any = '';
  mymodel3: any = '';
  mymodel4 : any = '';
  PercentCheck: any;
  IsBreak: boolean;
  tempObject: any;
  PurchasePriceA: any;
  UnitPriceA: any;
  // public PostObjectList: any[] = [];
  blocked : any;
  postupdateitemDC : postupdateitemDC[];
  updateBtn : boolean;
  valid : boolean = false;
  subcateid: number;
  history : boolean = false;
  isWarehouseId : boolean;
  entity : any;
  entityID : any;

  constructor(private cityService: CityService, private itemService : ItemService,private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { 
      this.isWarehouseId = true;
    }

  ngOnInit(): void {
    this.postupdateitemDC = [];
    this.entity = "ItemMaster";//"ItemMasterCentral";
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.Cityid = null;
    this.updateBtn = false;
    this.blocked = true;
    this.cityService.GetAllCity().subscribe(results => {
      this.blocked = false;
      this.cities = results;
    });
  }
  onItemTextchange(event, CityId) {
    if (event.query.length > 2) {
      if (CityId > 0) {       
        this.CityId = CityId;
        this.blocked = true;
        this.itemService.getItemcity(this.CityId,event.query).subscribe(x => {
          this.ItemList = x;
          this.blocked = false;
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Please select city.!', detail: '' });
      }
    }
  }
  onmodelChange() {
    this.radiobtn = true;
    this.selectedItem = this.selectedItem;
    this.filter();
    console.log(this.selectedItem);
  }
  filter() {
    this.radiobtn = true;
    this.updateBtn = false;
    let ItemMultiMRPId = this.selectedItem.ItemMultiMRPId;
    let Number = this.selectedItem.Number;
    let CityId = this.CityId;
    this.blocked = true;
    this.itemService.getItemDetail(ItemMultiMRPId, CityId, Number).subscribe(x => {
      this.searchDisable = true;
      this.showdata = true;
      this.FindItemList = x;
      this.blocked = false;
      this.FindItemList.forEach(element => {
        if (element.active == true) {
          this.Statusvalue = true;
        } else {
          return this.Statusvalue = false;
        }
      });    

      this.LimitItemList = this.FindItemList.filter((v, i) => this.FindItemList.findIndex(item => item.ItemMultiMRPId == v.ItemMultiMRPId && item.WarehouseId == v.WarehouseId) === i);
     
    })
  }
  valuePoPrice(name) {
    if (name <= this.FindItemList[0].MRP) {
      this.FindItemList.forEach(element => {
        element.POPurchasePrice = name;
      });
    }
    else {
      this.FindItemList.forEach(element => {
        element.POPurchasePrice = 0;
      });
      this.messageService.add({ severity: 'error', summary: 'Po Price should be less then equal to MRP.!', detail: '' });
    }
  }
  valueDis(name) {
    let discountnew = name;
    let margingnew = this.mymodel3;
    let x = this.FindItemList;
    if (this.mymodel3 <= 0) {
      this.mymodel3 = 0;
      margingnew = 0;
    }

    if (discountnew <= 100) {
      let withouttaxvalue = (x[0].PurchasePrice / ((100 + x[0].TotalTaxPercentage) / 100));
      let withouttax = Math.round(withouttaxvalue * 100) / 100;
      let netDiscountAmountvalue = (withouttax * (discountnew / 100));
      let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
      let NetPurchasePrice = withouttax - netDiscountAmount;
      let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
      let value = x[0].PurchasePrice + (x[0].PurchasePrice * margingnew / 100);
      this.UnitPriceA = Math.round(value * 100) / 100;
      this.FindItemList.forEach(element => {
        element.Discount = discountnew;
      });
    } else {
      this.FindItemList.forEach(element => {
        element.Discount = 0;
      });
      this.messageService.add({ severity: 'error', summary: 'Dicount Less then equal to 100 %.!', detail: '' });
    }
  }
  valuePurPrice(name) {
    let discountnew = this.mymodel2;
    let margingnew = this.mymodel3;
    let purchasepricenew = name;
    let x = this.FindItemList;

    if (this.mymodel3 <= 0) {
      this.mymodel3 = 0;
      margingnew = 0;
    }
    if (this.mymodel2 <= 0) {
      this.mymodel2 = 0;
      discountnew = 0;
    }
    let withouttaxvalue = (purchasepricenew / ((100 + x[0].TotalTaxPercentage) / 100));
    let withouttax = Math.round(withouttaxvalue * 100) / 100;
    let netDiscountAmountvalue = (withouttax * (discountnew / 100));
    let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
    let NetPurchasePrice = withouttax - netDiscountAmount;
    let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
    let value = purchasepricenew + (purchasepricenew * margingnew / 100);
    this.UnitPriceA = Math.round(value * 100) / 100;
    this.FindItemList.forEach(element => {
      element.PurchasePrice = purchasepricenew;
      element.UnitPrice = (Math.round((element.PurchasePrice + (element.PurchasePrice * element.Margin / 100)) * 100) / 100).toFixed(2);
    });
  }
  valueMargin(name) {
    let discountnew = this.mymodel2;
    let margingnew = name;
    let x = this.FindItemList;

    if (this.mymodel2 <= 0) {
      this.mymodel2 = 0;
      discountnew = 0;
    }
    let withouttaxvalue = (x[0].PurchasePrice / ((100 + x[0].TotalTaxPercentage) / 100));
    let withouttax = Math.round(withouttaxvalue * 100) / 100;
    let netDiscountAmountvalue = (withouttax * (discountnew / 100));
    let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
    let NetPurchasePrice = withouttax - netDiscountAmount;
    let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (x[0].TotalTaxPercentage / 100))
    let value = x[0].PurchasePrice + (x[0].PurchasePrice * margingnew / 100);
    this.UnitPriceA = Math.round(value * 100) / 100;
    this.FindItemList.forEach(element => {
      element.Margin = margingnew;
      element.UnitPrice = (Math.round((element.PurchasePrice + (element.PurchasePrice * element.Margin / 100)) * 100) / 100).toFixed(2);
    });
  }

  SICDisMargin(item) {
    // let withouttaxvalue = (item.PurchasePrice / ((100 + item.TotalTaxPercentage) / 100));
    // let withouttax = Math.round(withouttaxvalue);//Math.round(withouttaxvalue * 100) / 100;
    // let netDiscountAmountvalue = (withouttax * (item.Discount / 100));
    // let netDiscountAmount = Math.round(netDiscountAmountvalue);
    // let NetPurchasePrice = withouttax - netDiscountAmount;
    // let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (item.TotalTaxPercentage / 100))
    // let value = WithTaxNetPurchasePrice + (WithTaxNetPurchasePrice * item.Margin / 100);
    // item.UnitPrice = Math.round(value * 100) / 100;
    // itemMaster.Discount = item.Discount;
    // itemMaster.Margin = item.Margin;
    var value = item.PurchasePrice + (item.PurchasePrice * item.Margin / 100);
    item.UnitPrice = (Math.round(value * 100) / 100).toFixed(2);
  }
  SICPurPrice(item) {
    if (item.PurchasePrice > 0) {     
      // let withouttaxvalue = (item.PurchasePrice / ((100 + item.TotalTaxPercentage) / 100));
      // let withouttax = Math.round(withouttaxvalue * 100) / 100;
      // let netDiscountAmountvalue = (withouttax * (item.Discount / 100));
      // let netDiscountAmount = Math.round(netDiscountAmountvalue * 100) / 100;
      // let NetPurchasePrice = withouttax - netDiscountAmount;
      // let WithTaxNetPurchasePrice = NetPurchasePrice * (1 + (item.TotalTaxPercentage / 100))
      // let value = WithTaxNetPurchasePrice + (WithTaxNetPurchasePrice * item.Margin / 100);
      // item.UnitPrice = Math.round(value * 100) / 100;
      var value = item.PurchasePrice + (item.PurchasePrice * item.Margin / 100);
      item.UnitPrice = (Math.round(value * 100) / 100).toFixed(2);
    } else {
      this.messageService.add({ severity: 'error', summary: "Purchase Price can't set to zero.!", detail: '' });
      return false;
    }
  }
  valueLimitQty(name) {
    if (name > 0) {
      this.FindItemList.forEach(element => {
        element.ItemlimitQty = name;
        element.IsItemLimit = true;
      });
    } else {
      this.FindItemList.forEach(element => {
        element.ItemlimitQty = name;
        element.IsItemLimit = false;
      });
    }
  }

  Update(dataobject) {
    this.IsBreak = true;

    this.tempObject = dataobject;
    this.tempObject.forEach(element => {

      this.PercentCheck = 0;
      if (((element.POPurchasePrice - element.PurchasePrice) / element.POPurchasePrice) * 100 >= 2) {

        this.PercentCheck = ((element.POPurchasePrice - element.PurchasePrice) / element.POPurchasePrice) * 100;
        var FirstAlert = confirm(" Purchase price is  " + this.PercentCheck.toFixed(2) + " %  is less than of PO price , Do you want to process");
        if (FirstAlert == true) {
          console.log('first');
          this.messageService.add({ severity: 'error', summary: "Purchase price is" + " " + this.PercentCheck.toFixed(2) + " " +  " %  is less than of PO price , Do you want to process!", detail: '' });
          var SecondAlert = confirm("Purchase price is " + this.PercentCheck.toFixed(2) + " %  is less than of PO price , Do you want to process");
          if (SecondAlert == true) {
            console.log('Second');
            this.messageService.add({ severity: 'error', summary: "Purchase price is" + " " + this.PercentCheck.toFixed(2) + " " +  " %  is less than of PO price , Do you want to process!", detail: '' });
          }
          else {
            this.IsBreak = false;
            return false;
          }
        }
        else {
          this.IsBreak = false;
          return false;
        }
      }
      let limitqty = this.LimitItemList.find(x => x.ItemMultiMRPId == element.ItemMultiMRPId && x.WarehouseId == element.WarehouseId);
      let obj: any = {
        ItemId: element.ItemId,
        ItemMultiMRPId: element.ItemMultiMRPId,
        POPurchasePrice: element.POPurchasePrice,
        Discount: element.Discount,
        Margin: element.Margin,
        UnitPrice: element.UnitPrice,
        ItemlimitQty: limitqty.ItemlimitQty == '0' ? '' : limitqty.ItemlimitQty,
        IsItemLimit: limitqty.IsItemLimit == 0 ? '' : limitqty.IsItemLimit,
        active: element.active,       
        PurchasePrice: element.PurchasePrice,
        PrimePrice: element.PrimePrice,
        IsPrimeActive: element.IsPrimeActive
      }
      this.postupdateitemDC.push(obj);
    });
    if (!this.IsBreak) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {

        this.blocked = true;
        this.itemService.postitemdetail(this.postupdateitemDC).subscribe(x => {
          let res = x;
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: res, detail: '' });
          this.refresh();
        });
      }
    });
  }

  itemLimitdata(limititem)
  {
    if(limititem.ItemlimitQty > 0)
    {
      this.updateBtn = false;
    }
    if(limititem.IsItemLimit == true)
    {
      // this.messageService.add({ severity: 'error', summary: 'Limit Qty is Mandatory', detail: '' }); && limititem.ItemlimitQty == null
      this.updateBtn = false; 
      this.valid = false;
    }
    if(limititem.IsItemLimit == false && (limititem.ItemlimitQty == '' || limititem.ItemlimitQty == '0'))
    {
      this.messageService.add({ severity: 'error', summary: 'Limit Qty is Mandatory', detail: '' });
     
    }
    if((limititem.IsItemLimit == false && limititem.ItemlimitQty == null))
    { 
      this.valid = true; 
    }
       
    // if(limititem.IsItemLimit == true)
    // {
    //   this.updateBtn = true;
    //   this.valid = true;
    // }
    // else{
    //   this.updateBtn = false;
    // }
  }
  itemLimitQtydata(qty)
  {
    if(qty.ItemlimitQty > 0)
    {

    }
    else
    {
      if(qty.IsItemLimit == true && qty.ItemlimitQty <= '0')
      {
        this.messageService.add({ severity: 'error', summary: 'Limit Qty is Mandatory', detail: '' });
      }
      
    }
  }
  itemQty(data)
  {
    if(data.IsItemLimit == true && data.ItemlimitQty == '')
    {
      this.updateBtn = true;
    }
    else
    {
      this.updateBtn = false;
    }
  }
  clear() {
    this.selectedItem = null;
    this.searchDisable = false;
    this.showdata = false;
    this.FindItemList = null;
    this.ItemList = null;
    this.mymodel = null;
    this.mymodel2 = null;
    this.mymodel3 = null;
    this.PurchasePriceA = null;
    this.UnitPriceA = null;
    this.postupdateitemDC = [];
  }
  refresh() {
    this.searchDisable = false;
    this.showdata = false;
    this.FindItemList = null;
    this.selectedItem = null;
    this.searchDisable = false;
    this.ItemList = null;
    this.mymodel = null;
    this.mymodel2 = null;
    this.mymodel3 = null;
    this.PurchasePriceA = null;
    this.UnitPriceA = null;
    this.ngOnInit();
  }

  historyData(item)
  {
    this.entityID = item.ItemId;
    this.history = true;
  }

}
