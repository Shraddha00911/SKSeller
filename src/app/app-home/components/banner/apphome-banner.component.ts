import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ContentChildren, ViewChild, DoCheck, AfterContentChecked } from '@angular/core';

import Swal from 'sweetalert2';
import { ItemService } from '../../services/item.service';
import { SectionItem } from '../../interface/SectionItem';
import * as _ from 'lodash';
import { AppHomeService } from '../../services/app-home.service';

@Component({
  selector: 'apphome-banner',
  templateUrl: './apphome-banner.component.html',
  styleUrls: ['./apphome-banner.component.scss']
})
export class AppHomeBannerComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() indexOfItem: any;
  // @Input() BaseCategories: any;
  // @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removeBanner = new EventEmitter();
  @Output() disablePublish = new EventEmitter();
  @Input() showMobileView: any;
  @Input() itemOpen: any;
  @Input() currentToggleIndex: any;
  @Input() WarehouseId: any;
  currentItemIndex: any;
  display: boolean = false;
  blocked = false;

  currentAppItem: any;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };
  accordionSectionsList: any;
  file: any;
  count = 1;
  bannerItem = new SectionItem();
  invalidItemArray = [];
  activeItemsLength = 0;
  constructor(private itemService: ItemService, private appHomeService: AppHomeService) {
    this.bannerItem.BannerName = 'New Banner Item' + this.count;

  }

  ngOnInit() {
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
    this.bannerItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
    if (this.item.SectionSubType != 'Slider') {
      this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
        this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    }
  }

  deleteItem(index) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: 'Item will be Cleared',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      this.disablePublish.emit(true);
      if (result.value) {
        this.item.AppItemsList[index].Deleted = true;
        this.item.AppItemsList[index].Active = false;
        if (this.item.SectionSubType != 'Slider') {
          this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
            this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
        }
      }
    });
    this.disablePublish.emit(false);
  }

  SaveSection(SectionID) {
    
    this.addSection.emit(SectionID);
    let appItemInvalidArray = [];
    let appItemInvalidCount = 0;
    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(appItem => {
        if (!appItem.Deleted) {
          if (!appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
            appItemInvalidCount++
            appItemInvalidArray.push(appItem.BannerName)
            this.disablePublish.emit(true);
          }
        }
      });
      appItemInvalidCount > 0 ?
        Swal.fire('Please Fill Complete Details for ' + appItemInvalidArray) :
        this.addSection.emit(SectionID);
    }
    this.disablePublish.emit(false);
  }

  upload(file: File[], j) {
    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.onUpload(j);
    }
    (success) => {
      alert("image uploaded successfully")
      this.onUpload(j);
    };
    this.disablePublish.emit(false);
  }

  onUpload(j) {
    let formData = new FormData();
    formData.append('file', this.file[0]);
    this.blocked = true;

    this.itemService.uploadImage(formData).subscribe(result => {
      this.blocked = false;
     
      if (result == null) {
        Swal.fire("uploaded image are inappropriate, please upload correct image");
        return false;
      }
      else {
        console.log("Image Url:" + result);
        this.currentAppItem.BannerImage = result;
        Swal.fire('Image uploaded');
      }
    })
    this.disablePublish.emit(false);
  }

  createNewSection() {
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }

  createNewBannerItem() {
    
    if (this.checkInvalidTileItem() == false) {
      let bannerItemData = new SectionItem();
      // bannerItemData.BannerName = 'New Banner Item' + this.count;
      if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
        bannerItemData.HasOffer = true;
      }
      bannerItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
      this.bannerItem.RedirectionType = this.item.SectionSubType;
      this.item.AppItemsList.push(bannerItemData);
      Swal.fire('Banner Item Created');
    }
    else {
      Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
      this.invalidItemArray = [];
    }
    if (this.item.SectionSubType != 'Slider') {
      this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
        this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    }
    this.disablePublish.emit(false);
  }



  checkInvalidTileItem() {
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {

        if (this.item.SectionSubType != 'Slider') {
          if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }
        else {
          if (!mainimage.BannerImage || mainimage.BannerImage == '') {
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

  setBannerItemName(bannerItem) {
   
    this.disablePublish.emit(false);
    this.currentAppItem.BannerName = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.catName];
    if (!this.currentAppItem.BannerImage) {
      this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];

    }
  }

  handleClose(event) {
   
    this.disablePublish.emit(false);
    this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
  }

  showDialog(j) {
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
    this.currentItemIndex = j;
  }


  saveSectionItem(currentAppItem) {
   
    if (currentAppItem.HasOffer && (currentAppItem.OfferEndTime == undefined || currentAppItem.OfferStartTime == undefined)) {
      alert(" Please choose start and end date");
      currentAppItem = null;
      return false;

    }
    this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
    // this.bannerItem.RedirectionType = this.item.SectionSubType;
    // this.currentAppItem = new SectionItem();
    // this.currentAppItem.BannerName = 'New Banner Item' + this.count;
    // this.currentAppItem.RedirectionID = 'null';
    // this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
  }
  saveList(AppItemsList) {
    
    console.log('item', this.item);
    this.blocked = true;

    this.appHomeService.saveSection(this.item).subscribe(x => {
      
      this.blocked = false;


      if (x.error) {
        Swal.fire(x.msg);
      }
      else {
        Swal.fire('section saved');

        this.accordionSectionsList = x.AppHomeSections;
      }
    });
  }
}