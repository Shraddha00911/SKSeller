import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef, DoCheck } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { Accordion } from 'primeng/accordion';
import { AppHomeTileComponent } from '../tile/apphome-tile.component';
import { AppHomeService } from '../../services/app-home.service';
import { ItemService } from '../../services/item.service';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {
  @ViewChild(Accordion, { static: false }) accordion: Accordion;
  showMobileView: boolean = true;
  index: number = null;
  lastIndex = -1;
  isAppHomeEdit: boolean;
  SectionData = {
    WarehouseId: null,
    AppType: 'Store'
  };
  cityId: any;
  openclonepopup = false;
  Items = [];
  warehouseList = [];
  accordionSectionsList: any;
  // BaseCategories: any;
  // categorys: any;
  subsubcats: any;
  openpopup = false;
  data = {
    SectionID: 0,
    CreatedDate: new Date(),
    UpdatedDate: new Date(),
    SectionType: '',
    IsBanner: false,
    IsPopUp: false,
    IsTile: false,
    SectionName: '',
    sectionHindiName: '',
    SectionSubType: '',
    ViewType: 'AppView',
    AppItemsList: [],
    WarehouseID: this.SectionData.WarehouseId,
    AppType: this.SectionData.AppType,
    WebViewUrl: '',
    ColumnCount: 0,
    Deleted: false,
    itemOpen: false
  };
  SubSectionType = [];

  SubSectionTypeForTile = [{
    //   'type': 'Base Category'
    // }, {
    //   'type': 'Category'
    // }, {
    'type': 'Item'
  }, {
    'type': 'Brand'
    // }, {
    //   'type': 'Offer'
  }, {
    'type': 'Flash Deal'
  }
  ];

  sectionSubTypeforPopUp = [{
    'type': 'Item'
  }, {
    'type': 'Brand'
  },
  {
    'type': 'Video'
  }, {
    'type': 'Other'
  }
  ];

  SubSectionTypeForBanner = [
    //   {
    //   'type': 'Item'
    // },
    {
      'type': 'Brand'
    }, {
      //   'type': 'Offer'
      // }, {
      'type': 'Slider'
    }];
  currentToggleIndex: number;
  accordionOpen: boolean;
  validAppHome: boolean = true;
  @ViewChild(AppHomeTileComponent, { static: false }) AppHomeTileComponent: AppHomeTileComponent;
  blocked = false;
  isAppHomeSaved = false;
  cloneSectionData = { appTypefrom: '', wIdfrom: null, appType: '', wId: null };
  appHomeDeleted: boolean;
  cityList: any;
  wareHouseList: any;
  Searchcityids: any;

  constructor(private apphomeservice: AppHomeService, private cityservice: CityService, private dashboardservice: DashboardService,
    private itemMasterService: ItemService, private _changeRef: ChangeDetectorRef) {
    this.isAppHomeEdit = true;
    // this.getBaseCategoryByRedirectionType();
    // this.getCategoriesByRedirectionType();
    this.getBrandByRedirectionType();
    this.Searchcityids = {};
  }

  ngOnInit() {
    this.blocked = true;
    this.cityservice.GetAllCity().subscribe(x => {
      this.cityList = x;
      this.blocked = false;
    });
    // this.getAllWarehosues();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
  }

  getAllWarehosues(cityId) {
    // debugger
    let cityids = [];
    for (var i in cityId) {
      cityids.push(cityId)
    }
    if (cityids) {
      this.Searchcityids.cityids = cityids;
      this.blocked = true;
    }

    this.dashboardservice.GetWarehouseByCityids(this.Searchcityids).subscribe(x => {
      this.blocked = false;
      // debugger;
      this.wareHouseList = x;
    });
  }

  getSectionsByWarehouseId(WarehouseId) {
    debugger;
    if (WarehouseId == "null" || WarehouseId == null) {
      Swal.fire('Select Warehouse');
      return false;
    }

    let data = { AppType: this.SectionData.AppType, WarehouseId: WarehouseId };
    this.blocked = true;

    this.apphomeservice.getSectionsByWarehouseId(data).subscribe(result => {
      this.accordionSectionsList = result;
      this.blocked = false;

      debugger;
      console.log(result);
      this.accordionSectionsList.forEach(item => {
        item.itemOpen = false;
        if (item.IsPopUp == true) {
          item.AppItemsList.forEach(item => {
            item.displayPopup = true;
          });
        }
      });
      // this.getBaseCategoryByRedirectionType();
      // this.getCategoriesByRedirectionType();
      this.getBrandByRedirectionType();
      this.getItemsByRedirectionType(Number(WarehouseId));
    });
  }

  editImage(event, mainimage, itemIndex, imageIndex) {
    debugger
    this.accordionSectionsList[itemIndex].AppItemsList[imageIndex].BannerImage = event.target.result;
  }

  // getBaseCategoryByRedirectionType() {
  //   this.apphomeservice.getBaseCategoryByRedirectionType().subscribe(result => {
  //     this.BaseCategories = result;

  //   });
  // }

  // getCategoriesByRedirectionType() {
  //   this.apphomeservice.getCategoriesByRedirectionType().subscribe(result => {
  //     this.categorys = result;

  //   });
  // }

  getBrandByRedirectionType() {
    this.blocked = true;

    this.apphomeservice.getBrandByRedirectionType().subscribe(result => {
      debugger;
      this.subsubcats = result;
      this.blocked = false;

    });
  }

  getItemsByRedirectionType(WarehouseId) {
    this.blocked = true;

    this.apphomeservice.GetItemM(WarehouseId).subscribe(result => {
      this.blocked = false;

      setTimeout(() => {
        this.Items = result;
      }, 1000);

    });
  }

  addSection(SectionID) {
    debugger;
    let section = this.accordionSectionsList.filter(section => SectionID == section.SectionID)[0];
    this.blocked = true;

    this.apphomeservice.saveSection(section).subscribe(result => {
      this.blocked = false;
      debugger;
      if (result.error) {
        Swal.fire(result.msg);
        return false;
      }
      else {
        Swal.fire('section saved');
        console.log(result);

      }
    });
  }

  addNewSection() {
    this.openpopup = true;
  }

  createNewSection() {
    debugger
    if (this.data.IsTile && this.data.SectionSubType == 'Flash Deal') {
      let existingItem = this.accordionSectionsList.filter(item => item.SectionSubType == 'Flash Deal' && item.Deleted == false)[0];
      if (existingItem) {
        Swal.fire({ icon: 'error', text: 'Please Delete Previous Flash Deal to Add New' });
        this.data = {
          SectionID: 0,
          CreatedDate: new Date(),
          UpdatedDate: new Date(),
          SectionType: '',
          IsBanner: false,
          IsPopUp: false,
          IsTile: false,
          SectionName: '',
          sectionHindiName: '',
          SectionSubType: '',
          ViewType: 'AppView',
          AppItemsList: [],
          WarehouseID: this.SectionData.WarehouseId,
          AppType: this.SectionData.AppType,
          WebViewUrl: '',
          ColumnCount: 0,
          Deleted: false,
          itemOpen: false
        };
        this.openpopup = false;

      }
      else {
        this.openpopup = false;
        this.blocked = true;
        this.data.WarehouseID = this.SectionData.WarehouseId;
        this.data.AppType = this.SectionData.AppType;

        this.apphomeservice.saveSection(this.data).subscribe(result => {

          if (result.error) {
            Swal.fire(result.msg);
          }
          else {
            this.appHomeDeleted = false;
            this.blocked = false;
            result.AppHomeSections.itemOpen = false;
            debugger;
            this.accordionSectionsList.push(result.AppHomeSections);
            this.isAppHomeSaved = false;
            Swal.fire('section saved');
            console.log(result.AppHomeSections);
            this.data = {
              SectionID: 0, CreatedDate: new Date(), UpdatedDate: new Date(), SectionType: '', IsBanner: false, IsPopUp: false, IsTile: false, SectionName: '', ColumnCount: 0,
              sectionHindiName: '', SectionSubType: '', ViewType: 'AppView', AppItemsList: [], WarehouseID: this.SectionData.WarehouseId, AppType: this.SectionData.AppType, WebViewUrl: '', Deleted: false,
              itemOpen: false
            };
            Swal.fire('new section created');
          }
        });
      }
    }
    else {
      this.openpopup = false;
      this.blocked = true;
      this.data.WarehouseID = this.SectionData.WarehouseId;
      this.data.AppType = this.SectionData.AppType;
      debugger;
      this.apphomeservice.saveSection(this.data).subscribe(result => {

        if (result.error) {
          Swal.fire(result.msg);
        }
        else {

          this.appHomeDeleted = false;
          this.blocked = false;
          result.AppHomeSections.itemOpen = false;
          this.accordionSectionsList.push(result.AppHomeSections);
          debugger
          this.isAppHomeSaved = false;
          Swal.fire('section saved');
          console.log(result.AppHomeSections);
          this.data = {
            SectionID: 0, CreatedDate: new Date(), UpdatedDate: new Date(), SectionType: '', IsBanner: false, IsPopUp: false, IsTile: false, SectionName: '', ColumnCount: 0,
            sectionHindiName: '', SectionSubType: '', ViewType: 'AppView', AppItemsList: [], WarehouseID: this.SectionData.WarehouseId, AppType: this.SectionData.AppType, WebViewUrl: '', Deleted: false,
            itemOpen: false
          };
          Swal.fire('new section created');
        }
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.accordionSectionsList, event.previousIndex, event.currentIndex);
  }

  removeSection(item) {
    debugger;
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
        this.blocked = true;
        let itemIndex = this.accordionSectionsList.findIndex(section =>
          section.SectionID == item.SectionID && section.CreatedDate == item.CreatedDate && section.UpdatedDate == item.UpdatedDate);
        this.accordionSectionsList[itemIndex].IsActive = false;
        this.accordionSectionsList[itemIndex].Deleted = true;
        this.apphomeservice.deleteSection(item.SectionID).subscribe(result => {
          this.blocked = false;
        });
        // this.apphomeservice.saveSection(this.accordionSectionsList[itemIndex]).subscribe(result => {
        // });
        Swal.fire(
          'Deleted!',
          'Your Item has been deleted.',
          'success'
        )
      }
    })
  }

  saveCompleteAppHome() {
    let data = { AppType: this.SectionData.AppType, WarehouseId: this.SectionData.WarehouseId };
    this.blocked = true;

    this.apphomeservice.getSectionsByWarehouseId(data).subscribe(result => {
      this.accordionSectionsList = result;
      this.blocked = false;

      this.checkSectionValidation('saveCompleteAppHome');
    });
  }

  setCurrentIndex(event) {
    this.currentToggleIndex = event.index;
  }

  checkTileExist() {
    console.log(this.AppHomeTileComponent);
  }

  deleteCompleteAppHome() {

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
        this.blocked = true;
        this.apphomeservice.deleteAppHome(this.accordionSectionsList).subscribe(result => {
          this.appHomeDeleted = true;
          this.blocked = false;
          this.accordionSectionsList = [];
          Swal.fire('App Home Deleted');
          window.location.reload();

        });
      }
    });
  }

  publishCompleteAppHome() {
    this.checkSectionValidation('publishCompleteAppHome');
  }

  checkSectionValidation(action) {
    debugger;
    let invalidTiles = [];

    this.accordionSectionsList.forEach((item, index) => {
      let invalidItems = 0;
      if (!item.Deleted || item.Deleted == false) {
        if (item.AppItemsList && item.AppItemsList.length) {
          item.AppItemsList.forEach((mainimage, index) => {
            if (!mainimage.Deleted || mainimage.Deleted == false) {
              if (item.SectionSubType == 'Offer') {
                if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !(mainimage.HasOffer && mainimage.OfferStartTime && mainimage.OfferEndTime)) {
                  invalidItems++;
                }
              }

              if (item.SectionSubType == 'Flash Deal') {
                if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !mainimage.RedirectionID || !(mainimage.OfferStartTime && mainimage.OfferEndTime) || !mainimage.MOQ || !mainimage.FlashDealQtyAvaiable || !mainimage.FlashDealSpecialPrice || !mainimage.UnitPrice || !mainimage.PurchasePrice || !mainimage.FlashDealMaxQtyPersonCanTake) {
                  invalidItems++;
                }
              }
              if (item.IsTile == true) {
                if (item.SectionSubType != 'Offer' || item.SectionSubType != 'Flash Deal') {
                  if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID) {
                    invalidItems++;
                  }
                }
              }
              if (item.IsBanner == true) {
                if (item.SectionSubType != 'Slider') {
                  if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
                    invalidItems++;
                  }
                }
              }
              if (item.IsPopUp == true) {
                if (item.SectionSubType != 'Offer' || item.SectionSubType != 'Flash Deal') {
                  if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
                    invalidItems++;
                  }
                }
              }
            }
          });
        }
        else {
          invalidItems++;
        }
      }
      if (invalidItems > 0) {
        invalidTiles.push(index + 1);
      }
    });
    if (invalidTiles.length) {
      this.validAppHome = false;
      Swal.fire('Please Enter Valid Details for Section ->      ' + invalidTiles);
    }
    else {
      this.blocked = true;
      switch (action) {
        case 'saveCompleteAppHome': {
          this.apphomeservice.saveCompleteAppHome(this.accordionSectionsList).subscribe(result => {
            this.blocked = false;
            this.isAppHomeSaved = true;
            Swal.fire(
              'app home saved'
            ).then((result) => {
              if (result.value) {
                this.validAppHome = true;
              }
            });
          });
          break;
        }
        case 'createNewAppSection': {
          this.openpopup = true;
          break;
        }
        case 'publishCompleteAppHome': {
          this.blocked = true;

          this.apphomeservice.publishCompleteAppHome(this.accordionSectionsList).subscribe(result => {
            Swal.fire(
              'app home published'
            )
            this.blocked = false;
          });
          break;
        }

      }

    }

  }

  openAcc(i) {
    this.accordionSectionsList[i].itemOpen = true;

  }

  closeAcc(i) {

    this.accordionSectionsList[i].itemOpen = false;
  }

  disablePublish(disableAppHomePublish) {
    this.isAppHomeSaved = false;
  }

  resetAppHome() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reset'
    }).then((result) => {
      if (result.value) {
        // this.SectionData.AppType = '';
        // this.SectionData.WarehouseId = null;
        // this.accordionSectionsList = [];

        // this.getSectionsByWarehouseId(this.SectionData.WarehouseId);
        window.location.reload();


      }
    });
  }

  closeAllMobilePopups() {
    debugger;
    this.accordionSectionsList.forEach(item => {
      if (item.IsPopUp == true) {
        item.AppItemsList.forEach(item => {
          item.displayPopup = false;
        });
      }
    });
  }

  closeMobilePopups(i, j) {
    this.accordionSectionsList[i].AppItemsList[j].displayPopup = false;
  }

  resetState() {
    debugger;
    this.accordionSectionsList.forEach(item => {
      if (item.IsPopUp == true) {
        item.AppItemsList.forEach(item => {
          item.displayPopup = true;
        });
      }
    });
  }

  openClonePopup() {
    this.openclonepopup = true;
    this.cloneSectionData = { appTypefrom: this.SectionData.AppType, wIdfrom: this.SectionData.WarehouseId, appType: null, wId: null };
  }

  cloneAppHome() {
    this.blocked = true;
    this.apphomeservice.cloneAppHome(this.cloneSectionData).subscribe(result => {
      Swal.fire(
        'app home cloned'
      )
      this.blocked = false;


    });
  }
}