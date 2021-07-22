import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { TargetService } from '../../services/target.service';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.scss']
})
export class TargetListComponent implements OnInit {

  isOpenPopup: boolean = false;
  salestargetList: any[];
  totalcount: number;
  skip: number = 1;
  take: number = 10;
  StoreId: number;
  SubCateId: number
  Searchkeyword: any
  filterdata: any;
  addtarget: any;
  SubCatId: number;
  storelist: [];
  SelectedStore: number;
  SelectedItemMultiMrpId: number;
  ItemList: any;
  selectedlist: any;
  subcateid: number;
  SelectedStoreId: number = 0;
  blocked: boolean;
  subcateName: any;
  disableStore: boolean;
  disableItemName: boolean;
  addItemList: Item[] = [];
  EditTarget: any;
  isEditPopup: boolean = false;
  constructor(private _service: TargetService, private router: Router, private ExportService: ExportServiceService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.addtarget = {};
    this.filterdata = {};
    this.EditTarget = {};
  }

  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.GetStoreList();
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    this.filterdata.skip = this.skip;
    this.filterdata.take = this.take;
    this.filterdata.StoreId = this.SelectedStoreId;
    this.filterdata.SubCateId = this.subcateid;
    this.filterdata.Searchkeyword = this.Searchkeyword;
    debugger
    if (this.SelectedStoreId > 0) {
      this._service.GetSalesTargetList(this.filterdata).subscribe(res => {
        debugger
        this.salestargetList = res.res;
        this.totalcount = res.totalcount;
      })
    }

  }
  Search(StoreId, Keyword) {
    if (!StoreId) {
      alert("select Store");
      return;
    }
    this.filterdata.SubCatId = this.subcateid;
    this.filterdata.StoreId = StoreId;
    this.filterdata.Searchkeyword = Keyword;
    this._service.GetSalesTargetList(this.filterdata).subscribe(res => {
      this.salestargetList = res.res;
      this.totalcount = res.totalcount;
    })
  }
  Export(StoreId) {
    if (!StoreId) {
      alert("select Store");
      return;
    }
    this.filterdata.SubCatId = this.subcateid;
    this.filterdata.StoreId = StoreId;
    this._service.SalesTargetExport(this.filterdata).subscribe(res => {
      if (res.res.length > 0) {
        this.ExportService.exportAsExcelFile(res.res, 'SalesTargetData')
      }
      else {
        alert("Record Not Found");
      }
    })
  }
  GetStoreList() {
    this.blocked = true;
    this._service.GetStoreList().subscribe(res => {
      this.blocked = false;

      this.storelist = res;
      console.log(res)
    })
  }
  GetMrpItemList(Sid,searchkey) {
    this.blocked = true;
    this._service.GetStoreMrpItemList(Sid).subscribe(res => {
      this.blocked = false;
      this.ItemList = res;
    })

    this.filterdata.SubCatId = this.subcateid;
    this.filterdata.StoreId = Sid;
    this.filterdata.Searchkeyword = searchkey;
    this._service.GetSalesTargetList(this.filterdata).subscribe(res => {
      this.salestargetList = res.res;
      this.totalcount = res.totalcount;
    })
  }

  AddItem() {
    if (!this.SelectedStoreId) {
      alert("select Store");
      return;
    }
    this.addtarget = {};
    this.isOpenPopup = true;
    this.disableStore = true;
    this.disableItemName = true;
    this.addItemList = [];
  }
  AddItemInList() {
    debugger
    if (this.addtarget.ItemMultiMrpId == null || this.addtarget.ItemMultiMrpId == 0) {
      alert("Select Item");
      return;
    }
    if (this.addtarget.BaseQty == null || this.addtarget.BaseQty == "" || this.addtarget.BaseQty == undefined) {
      alert("Enter Base Qty");
      return;
    }
    let obj: any = {
      BaseQty: this.addtarget.BaseQty,
      itemBaseName: this.addtarget.itemBaseName,
      ItemNumber: this.addtarget.ItemNumber,
      ItemMultiMrpId: this.addtarget.ItemMultiMrpId,
      MRP: this.addtarget.MRP,
      StoreId: this.SelectedStoreId
    }
    for (let i of this.addItemList) {
      if (this.addtarget.ItemMultiMrpId == i.ItemMultiMrpId) {
        alert("Item Already Added in List")
        return;
      }
    }
    this.addItemList.push(obj);
    this.addtarget.BaseQty="";
    this.addtarget.ItemMultiMrpId=0;
  }
  Remove(item) {
    this.addItemList.splice(item, 1)
  }
  SaveTarget() {
    this.blocked = true;
    //this.addtarget.StoreId = this.SelectedStoreId;
    this.addtarget.ItemList = this.addItemList;
    this._service.postTargetData(this.addtarget).subscribe(res => {
      this.blocked = false;
      this.isOpenPopup = false;
      this.addItemList = [];
      this.addtarget.ItemList=null;
    })
  }
  Edit(list) {
    this.EditTarget = list
    this.isEditPopup = true;
  }
  EditBaseQty() {
    debugger
    if (this.EditTarget.BaseQty == null || this.EditTarget.BaseQty == 0  || this.EditTarget.BaseQty == "" || this.EditTarget.BaseQty == undefined) {
      alert("Enter Base Qty");
      return;
    }
    this._service.EdtBaseQty(this.EditTarget).subscribe(res => {
      this.isEditPopup = false;
      this.addItemList=null;
    })
    
  }
  Delete(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.addtarget.Id = data.Id;
        this.addtarget.StoreId = data.StoreId;
        this.addtarget.IsDeleted = true;
        this.addtarget.itemBaseName = data.itemBaseName;
        this.addtarget.ItemNumber = data.ItemNumber;
        this.addtarget.ItemMultiMrpId = data.ItemMultiMrpId;
        this.addtarget.MRP = data.MRP;
        this.addtarget.BaseQty = data.BaseQty
        this.blocked = true;
        this._service.DeleteBaseQty(this.addtarget).subscribe(res => {
          this.blocked = false;
          this._service.GetSalesTargetList(this.filterdata).subscribe(res => {
            this.salestargetList = res.res;
            this.totalcount = res.totalcount;
          })
        })
      }
    })
  }
  selectChange(ItemMultiMrpId) {
    this.selectedlist = this.ItemList.filter(x => x.ItemMultiMrpId == ItemMultiMrpId);
    this.addtarget.itemBaseName = this.selectedlist[0].itemBaseName;
    this.addtarget.ItemNumber = this.selectedlist[0].ItemNumber;
    this.addtarget.ItemMultiMrpId = this.selectedlist[0].ItemMultiMrpId;
    this.addtarget.MRP = this.selectedlist[0].MRP;
  }
  cancel() {
    this.isOpenPopup = false;
    this.addtarget = {};
  }
}

export class Item {
  BaseQty: any
  itemBaseName: string
  ItemNumber: any
  ItemMultiMrpId: any
  MRP: any
  StoreId: number
  // Id: number
  // IsDeleted: boolean
  // totalRecord: number
}