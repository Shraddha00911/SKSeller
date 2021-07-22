import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output, ContentChildren, ViewChild, SimpleChanges, DoCheck, AfterContentChecked } from '@angular/core';
import Swal from 'sweetalert2';
import { Tab } from '../tabsets/tab';
import { Tabset } from '../tabsets/tabset';
import { SectionItem } from '../../interface/SectionItem';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'apphome-popup',
  templateUrl: './apphome-popup.component.html',
  styleUrls: ['./apphome-popup.component.scss']
})
export class AppHomePopupComponent implements OnInit {

  @Input() item: any;
  @Input() itemOpen: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Input() WarehouseId: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removePopup = new EventEmitter();
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Output() disablePublish = new EventEmitter();
  activeItemsLength = 0;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };
  count = 1;
  accordionSectionsList: any;
  file: any;
  public imagePath;
  isUploaded: boolean;
  bannerItem = new SectionItem();

  @ContentChildren(Tab) tabs;
  @ViewChild(Tabset, { static: false }) tabset !: Tabset;
  display: boolean;
  currentAppItem: any;
  currentItemIndex: any;
  invalidItemArray = [];
  blocked = false;

  constructor(private itemService: ItemService) {
    this.bannerItem.BannerName = 'New Popup Item' + this.count;

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
    this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    this.bannerItem.RedirectionType = this.item.SectionSubType;
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
      if (result.value) {
        this.item.AppItemsList[index].Deleted = true;
        this.item.AppItemsList[index].Active = false;
        this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
          this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
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
          if (!appItem.BannerImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
            appItemInvalidCount++
            appItemInvalidArray.push(appItem.BannerName)
          }
        }
      });

      appItemInvalidCount > 0 ?
        Swal.fire('Please Fill Complete Details for ' + appItemInvalidArray) :
        setTimeout(() => {
          this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
            this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
        }, 1000), this.addSection.emit(SectionID);
    }
    this.disablePublish.emit(false);
  }

  upload(file: File[],  j) {
debugger;
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
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
debugger;
    let formData = new FormData();
    formData.append('file', this.file[0]);
    this.blocked=true;
    this.itemService.uploadImage(formData).subscribe(result => {
      this.isUploaded = true
      this.blocked=false;

      debugger;

      this.item.AppItemsList[j].BannerImage = result;
    })
    this.disablePublish.emit(false);
  }

  createNewSection() {
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }

  handleClose(event) {
    this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
    this.disablePublish.emit(false);
  }


  createNewBannerItem() {
    if (this.checkInvalidTileItem() == false) {
      let bannerItemData = new SectionItem();
      bannerItemData.BannerName = 'New Popup Item' + this.count;
      bannerItemData.RedirectionType = this.item.SectionSubType == 'Video' || this.item.SectionSubType == 'Other' ? null : this.item.SectionSubType;
      if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
        bannerItemData.HasOffer = true;
      }
      this.item.AppItemsList.push(bannerItemData);
      Swal.fire('Popup Item Created');
    }
    else {
      Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
      this.invalidItemArray = [];
    }
    this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    this.disablePublish.emit(false);
  }



  checkInvalidTileItem() {
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {
        if (this.item.SectionSubType != 'Offer' || this.item.SectionSubType != 'Flash Deal') {
          if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
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
    this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
  }

  showDialog(j) {
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
    this.currentItemIndex = j;
  }

  saveSectionItem(currentAppItem) {
    this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
    this.currentAppItem = new SectionItem();
    this.currentAppItem.BannerName = 'New Popup Item' + this.count;
    this.currentAppItem.RedirectionID = 'null';
    this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Video' || this.item.SectionSubType == 'Other' ? null : this.item.SectionSubType;
  }

}
