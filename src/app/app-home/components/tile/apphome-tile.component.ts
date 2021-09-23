import { filter } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, ViewChild, SimpleChanges, OnChanges, ElementRef, DoCheck, AfterContentChecked } from '@angular/core';
import Swal from 'sweetalert2';
import { Tab } from '../tabsets/tab';
import { Tabset } from '../tabsets/tabset';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { SectionItem } from '../../interface/SectionItem';
import { environment } from 'src/environments/environment';
import { AppHomeService } from '../../services/app-home.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'apphome-tile',
  templateUrl: './apphome-tile.component.html',
  styleUrls: ['./apphome-tile.component.scss']
})
export class AppHomeTileComponent implements OnInit {

  display: boolean = false;
  apiURL: string;
  @Input() item: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removeTile = new EventEmitter();
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Input() itemOpen: any;
  @Input() WarehouseId: any;

  terraceVar = false;
  count = 1;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };
  accordionSectionsList: any;
  file: any;
  public imagePath;
  isUploaded: boolean;
  tileItem = new SectionItem();
  deletedItemsLength: number = 0;
  @Output() disablePublish = new EventEmitter();
  @ContentChildren(Tab) tabs;
  @ViewChild(Tabset, { static: false }) tabset!: Tabset;
  currentTileItem = '';
  currentRowColumnCount: number;
  deletedRecords: number = 0;
  Flashdealexcelupload: boolean;
  alternateData: any[];
  AppItemsListRepeat: any;
  ColRowCountChanged: boolean;
  ColRowCountChangedList: boolean;
  actualItemsLength: number = 0;
  invalidTile: boolean = false;
  invalidItemArray = [];
  currentAppItem: any;
  currentItemIndex: any;
  displayTable: boolean;
  flashDealList = [];
  cols = [
    { field: 'TileName', header: 'TileName' },
    { field: 'OfferStartTime', header: 'OfferStartTime' },
    { field: 'OfferEndTime', header: 'OfferEndTime' },
    { field: 'FlashDealQtyAvaiable', header: 'FlashDealQtyAvaiable' },
    { field: 'FlashDealSpecialPrice', header: 'FlashDealSpecialPrice' },
  ];
  blocked = false;
  constructor(private itemService: ItemService, private dom: DomSanitizer, private apphomeservice: AppHomeService) {
    this.apiURL = environment.apiBaseUrl;
    this.tileItem.TileName = 'New Tile Item' + this.count;

  }

  ngOnInit() {
  
    this.subsubcats;
  }

  ngOnChanges(simplechanges: SimpleChanges) {
    simplechanges.subsubcats && simplechanges.subsubcats.currentValue && simplechanges.subsubcats.currentValue.length ?
      this.subsubcats = simplechanges.subsubcats.currentValue : '';
    simplechanges.Items && simplechanges.Items.currentValue && simplechanges.Items.currentValue.length ?
      this.Items = simplechanges.Items.currentValue : '';
    if (this.item && this.item.AppItemsList && this.item.AppItemsList.length) {
      this.item.AppItemsList.forEach(item => {
        item.OfferStartTime = new Date(item.OfferStartTime);
        item.OfferEndTime = new Date(item.OfferEndTime);
      });
    }
    this.currentRowColumnCount = this.item.ColumnCount * this.item.RowCount;
    this.tileItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
    if(this.item.SectionSubType == "Brand" && this.item.RowCount>1){
      this.item.RowCount = this.item.RowCount;
    }else{
      this.item.RowCount = 1;
    }
    console.log(this.item);
    if (this.item.AppItemsList.length == 0) {
      this.item.ColumnCount = 0;
    }
  }

  deleteItem(SectionItemID) {
    
    let itemIndex = this.item.AppItemsList.findIndex(appItem => appItem.SectionItemID == SectionItemID);
    this.item.AppItemsList[itemIndex].Deleted = true;
    this.item.AppItemsList[itemIndex].Active = false;
    setTimeout(() => {
      this.tabset.tabs && this.tabset.tabs.first ? this.tabset.tabClicked(this.tabset.tabs.first) : '';
    }, 500);
    Swal.fire(
      'Deleted!',
      'Your Item has been deleted.',
      'success'
    )
    this.disablePublish.emit(false);
    if (this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) &&
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length == 0) {
      this.item.ColumnCount = 0;
      this.item.rowCount = 0;
    }
  }

  SaveSection(SectionID) {
  
    if (this.checkInvalidTileItem() == false) {
      this.addSection.emit(SectionID);
      let appItemInvalidArray = [];
      let appItemInvalidCount = 0;
      if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
        this.item.AppItemsList.forEach(appItem => {
          if (!appItem.Deleted) {
            if (!appItem.TileImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
              appItemInvalidCount++
              appItemInvalidArray.push(appItem.TileName)
            }
          }
        });
        appItemInvalidCount > 0 ?
          this.terraceVar = false :
          setTimeout(() => {
            this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
              this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
          }, 1000);
      }
    }
    else {
      Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
      this.invalidItemArray = [];
    }
    this.disablePublish.emit(false);
  }

  upload(file: File[], imgUploadType, j: any) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.onUpload(imgUploadType, j);
    }
    (success) => {
      alert("image uploaded successfully")
      this.onUpload(imgUploadType, j);
    };
    this.disablePublish.emit(false);
  }

  onUpload(imgUploadType, j?) {
    
    let singleItem = j;
    let formData = new FormData();
    formData.append('file', this.file[0]);
   
    this.blocked = true;
    this.itemService.uploadImage(formData).subscribe(result => {
      if (result == null) {
        Swal.fire("uploaded image are inappropriate, please upload correct image");
        return false;
      }
      else {
        this.isUploaded = true
        this.blocked = false;
        this.currentAppItem.TileImage = result;
        Swal.fire('Image uploaded');

    
        console.log("Image Url:" + result);

        if (imgUploadType) {
          switch (imgUploadType) {
            case 'TileBackgroundImage': {

              this.item.TileBackgroundImage = result;
              this.item.HasBackgroundImage = true;
              this.item.HasBackgroundColor = false;
              this.blocked = true;

              // this.apphomeservice.saveSection(this.item).subscribe(result => {
              //   this.blocked = false;

              // });
              break;
            }
            case 'TileHeaderBackgroundImage': {
              this.item.TileHeaderBackgroundImage = result;
              this.item.HasHeaderBackgroundImage = true;
              this.item.HasHeaderBackgroundColor = false;
              this.blocked = true;

              // this.apphomeservice.saveSection(this.item).subscribe(result => {
              //   this.blocked = false;

              // });
              break;
            }
            case 'TileAreaHeaderBackgroundImage': {
              this.item.TileAreaHeaderBackgroundImage = result;
              this.blocked = true;

              // this.apphomeservice.saveSection(this.item).subscribe(result => {
              //   this.blocked = false;

              // });
              break;
            }
            case 'sectionBackgroundImage': {
              this.item.sectionBackgroundImage = result;
              this.blocked = true;

              // this.apphomeservice.saveSection(this.item).subscribe(result => {
              //   this.blocked = false;

              // });
              break;
            }
            case 'TileSectionBackgroundImage': {
              this.item.AppItemsList[singleItem].TileSectionBackgroundImage = result;
              //this.currentAppItem.TileSectionBackgroundImage = result;
              this.blocked = true;

              // this.apphomeservice.saveSection(this.item).subscribe(result => {
              //   this.blocked = false;

              // });
              break;
            }

            default: {
              break;
            }
          }
        }
        else {
          this.currentAppItem.TileImage = result;
        }
      }
    })
    this.disablePublish.emit(false);
  }

  createNewSection() {
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }

  createNewTileItem() {
    let appItemInvalidArray = [];
    let appItemInvalidCount = 0;
    let tileItemData = new SectionItem();
    if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
      tileItemData.HasOffer = true;
    }
    tileItemData.RedirectionID = null
    tileItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
    this.item.SectionSubType == 'Offer' ? tileItemData.HasOffer = true : '';
    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(appItem => {
        if (!appItem.Deleted) {
          if (!appItem.TileImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
            appItemInvalidCount++
            appItemInvalidArray.push(appItem.TileName)
          }
        }
      });

      // appItemInvalidCount > 0 ?
      false ?
        Swal.fire('Please Fill Valid Details for ' + appItemInvalidArray) : (this.item.AppItemsList.push(tileItemData),
          this.count++,
          setTimeout(() => {
            this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
              this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
          }, 1000));
    }
    else {
      this.item.AppItemsList.push(tileItemData);
      this.count++;
      setTimeout(() => {
        this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
          this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
      }, 1000);
    }
    this.disablePublish.emit(false);
  }

  photoURL(imageUrl) {
    let thing = this.dom.bypassSecurityTrustResourceUrl(imageUrl);
    return thing;
  }

  setTileItemName(bannerItem) {
    
    this.disablePublish.emit(false);
    let temptilename = this.currentAppItem.TileName;
    this.currentAppItem.TileName = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.catName];

    if (!this.currentAppItem.TileImage) {
      this.currentAppItem.TileImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];

    } if (this.currentAppItem.TileName != temptilename && this.currentAppItem.TileImage != null) {
      this.currentAppItem.TileImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
    }
  }

  disableImageSelection(imgUploadType) {
   
    this.disablePublish.emit(false);
    let formData = new FormData();
    switch (imgUploadType) {
      case 'TileBackgroundImage': {
        this.item.TileBackgroundImage = '';
        this.item.HasBackgroundImage = false;
        this.item.HasBackgroundColor = true;
        //this.blocked = true;

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        //   this.blocked = false;

        // });
        break;
      }
      case 'TileHeaderBackgroundImage': {
        this.item.TileHeaderBackgroundImage = '';
        this.item.HasHeaderBackgroundImage = false;
        this.item.HasHeaderBackgroundColor = true;
        //this.blocked = true;

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        //   this.blocked = false;

        // });
        break;
      }
      case 'TileAreaHeaderBackgroundImage': {
        this.item.TileAreaHeaderBackgroundImage = '';
        //this.blocked = true;

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        //   this.blocked = true;

        // });
        break;
      }
      case 'sectionBackgroundImage': {
        this.item.sectionBackgroundImage = '';
        //this.blocked = true;

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        //   this.blocked = false;

        // });
        break;
      }
      case 'tileTextColor': {
       
        // this.blocked = true;

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        //   this.blocked = false;

        // });
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }



  handleClose(event) {
  
    this.disablePublish.emit(false);
    this.item.AppItemsList[event.index].Active = false;
    this.item.AppItemsList[event.index].Deleted = true;
    //this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
  }

  getColCount() {
    return Number(this.item.ColumnCount);
  }

  saveColumnCount() {
  
    // this.disablePublish.emit(false);
    // this.blocked = true;

    // this.apphomeservice.saveSection(this.item).subscribe(result => {
    //   this.blocked = false;

    // });
  }

  addNewRow() {
 
    if (this.item.ColumnCount && this.item.ColumnCount > 0 && this.checkInvalidTileItem() == false) {
      this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 1;
      for (let i = 1; i <= Number(this.item.ColumnCount); i++) {
        let tileItemData = new SectionItem();
        tileItemData.RedirectionID = null
        this.item.SectionSubType == 'Offer' ? tileItemData.HasOffer = true : '';
        tileItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;

        tileItemData.OfferStartTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : new Date();
        tileItemData.OfferEndTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : new Date();
        if (this.item.SectionSubType == 'Flash Deal') {
          tileItemData.HasOffer = true;
        }
        this.item.AppItemsList.push(tileItemData)
        console.log(tileItemData);
      }
      this.disablePublish.emit(false);
    }
    else {
      if (!this.item.ColumnCount || this.item.ColumnCount == 0) {
        Swal.fire('Please Select Columns FIrst');
      }
      else {
        Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
        this.invalidItemArray = [];
      }
    }
  }

  clearTileItem(j) {
    this.disablePublish.emit(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Item will be Cleared',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.item.AppItemsList[j] = new SectionItem();
        this.item.AppItemsList[j].RedirectionID = null
        this.item.SectionSubType == 'Offer' ? this.item.AppItemsList[j].HasOffer = true : '';
        this.item.AppItemsList[j].RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
      }
    });
  }

  checkInvalidTileItem() {
  
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {
        if (this.item.SectionSubType == 'Offer') {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !(mainimage.HasOffer && mainimage.OfferStartTime && mainimage.OfferEndTime)) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }

        if (this.item.SectionSubType == 'Flash Deal') {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !mainimage.RedirectionID || !(mainimage.OfferStartTime && mainimage.OfferEndTime) || !mainimage.MOQ || !mainimage.FlashDealQtyAvaiable || !mainimage.FlashDealSpecialPrice || !mainimage.UnitPrice || !mainimage.PurchasePrice || !mainimage.FlashDealMaxQtyPersonCanTake) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }

        if (this.item.SectionSubType != 'Offer' || this.item.SectionSubType != 'Flash Deal') {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }
      }
    });

    if (invalidItems > 0) {
      this.item.invalidItem = true;
      return true;
    }
    else {
      this.item.invalidItem = false;
      return false;
    }

  }

  deleteEntireGrid() {
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Grid will be Deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.disablePublish.emit(false);
        this.item.AppItemsList.forEach((mainimage, index) => {
          this.item.AppItemsList[index].Deleted = true;
        });
        this.item.ColumnCount = 0;
        this.item.rowCount = 0;
      }
    });
  }

  checkActiveItemsExist() {
    let activeItems = 0;
    this.item.AppItemsList.forEach(mainimage => {
      if (mainimage.Deleted == false) {
        activeItems++;
      }
    });
    if (activeItems > 0) {
      this.invalidTile = false;
      return false;
    }
    else {
      this.invalidTile = true;
      true;
    }
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  deleteRow(index) {
   
    this.disablePublish.emit(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.value) {
        if (this.item.ColumnCount == 1) {
          this.item.AppItemsList[index].Deleted = true;
        }
        if (this.item.ColumnCount == 2) {
          this.item.AppItemsList[index].Deleted = true;
          this.item.AppItemsList[index - 1].Deleted = true;
        }
        if (this.item.ColumnCount == 3) {
          this.item.AppItemsList[index].Deleted = true;
          this.item.AppItemsList[index - 1].Deleted = true;
          this.item.AppItemsList[index - 2].Deleted = true;
        }
        this.item.rowCount = this.item.rowCount - 1;
        let actualItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
        if (actualItemsList && actualItemsList.length == 0)
          this.item.ColumnCount = 0;
        this.item.rowCount = 0;
      }
    });

  }

  arrayTwo(array) {
    return array;
  }

  showDialog(j) {
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
    this.currentItemIndex = j;
  }

  getForm(itemForm) {
  }

  // saveSectionItem(currentAppItem) {
  //   this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
  //   this.currentAppItem = new SectionItem();
  //   this.currentAppItem.RedirectionID = 'null'
  //   this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
  //   this.item.SectionSubType == 'Offer' ? this.currentAppItem.HasOffer = true : '';
  //   this.apphomeservice.saveSection(this.item).subscribe(result => {
  //   });
  // }


  saveSectionItem(currentAppItem) {

    let isSaveadded = false;

    if (currentAppItem.MOQ > 0) {
      if (currentAppItem.FlashDealSpecialPrice > currentAppItem.UnitPrice) {
        currentAppItem.MOQ = null;
        currentAppItem.ItemId = null;
        currentAppItem.RedirectionID = null;
        isSaveadded = true;
        Swal.fire("Flash Deal price can't be greater than to Unitprice");
        return false;
      }
      if (currentAppItem.FlashDealQtyAvaiable % currentAppItem.MOQ != 0) {
        currentAppItem.MOQ = null;
        currentAppItem.ItemId = null;
        currentAppItem.RedirectionID = null; isSaveadded = true;
        Swal.fire("Flash Deal qty required in Multiple Of MOQ");

        return false;
      }
      if (currentAppItem.FlashDealMaxQtyPersonCanTake % currentAppItem.MOQ != 0) {
        currentAppItem.MOQ = null;
        currentAppItem.ItemId = null;
        currentAppItem.RedirectionID = null;
        isSaveadded = true;

        Swal.fire("Flash Deal Max qty required in Multiple Of MOQ");
        return false;
      }
      if (currentAppItem.FlashDealQtyAvaiable < currentAppItem.MOQ) {
        currentAppItem.MOQ = null;
        currentAppItem.ItemId = null;
        currentAppItem.RedirectionID = null;
        isSaveadded = true;

        Swal.fire("Flash Deal qty can't be less than to MOQ");
        return false;
      }
      if (currentAppItem.FlashDealQtyAvaiable < currentAppItem.FlashDealMaxQtyPersonCanTake) {
        currentAppItem.MOQ = null;
        currentAppItem.ItemId = null;
        isSaveadded = true;

        Swal.fire("Flash Deal qty can't be less than to MaxQty");
        return false;
      }
      if (this.item.AppItemsList.length > 0) {

        let itmids = [];
        this.item.AppItemsList.forEach((its, index) => {
          
          if ((its.Deleted == undefined || its.Deleted==false) && its.ItemId > 0 && its.RedirectionType == "Item" && (its.IsFlashDeal == undefined || its.IsFlashDeal==true)) {
            itmids.push(its.ItemId);
          }
        }
        );
        itmids.forEach((itsk, index) => {
          
          if (itsk == currentAppItem.ItemId) {
            Swal.fire("Item Already Added in Flash Deal");
            isSaveadded = true;
            return false;
          }

        });
      }
    }

    if (!isSaveadded) {
      this.item.AppItemsList[this.currentItemIndex] = currentAppItem;

    }
    // this.bannerItem.RedirectionType = this.item.SectionSubType;
    // this.currentAppItem = new SectionItem();
    // this.currentAppItem.BannerName = 'New Banner Item' + this.count;
    // this.currentAppItem.RedirectionID = 'null';
    // this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
  }


  saveList(AppItemsList) {
    console.log('item', this.item);
    this.blocked = true;

    this.apphomeservice.saveSection(this.item).subscribe(x => {
      this.blocked = false;
   

      if (x.error) {
        Swal.fire(x.msg);
        // window.location.reload;
      }
      else {
        Swal.fire('section saved');

        this.accordionSectionsList = x.AppHomeSections;
      }

    });
  }

  ViewFlashDealList() {
    this.displayTable = true;
  }

  ExportToExcel() {
    this.flashDealList = []
    this.item.AppItemsList.forEach((appItem, index) => {
      if (!appItem.Deleted || appItem.Deleted == 'false') {
        this.flashDealList.push({
          SNo: index + 1,
          OfferStartTime: appItem.OfferStartTime,
          OfferEndTime: appItem.OfferEndTime,
          FlashDealQtyAvaiable: appItem.FlashDealQtyAvaiable,
          FlashDealSpecialPrice: appItem.FlashDealSpecialPrice
        }
        );
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.flashDealList);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'flashItemList');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }
}
