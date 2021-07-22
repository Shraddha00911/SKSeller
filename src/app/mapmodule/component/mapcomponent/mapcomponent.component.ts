import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { ExecutiveService } from '../../services/exmap.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mapcomponent',
  templateUrl: './mapcomponent.component.html',
  styleUrls: ['./mapcomponent.component.scss']
})
export class MapcomponentComponent implements OnInit {
  title = 'My first AGM project';
  // lat = 51.678418;
  // lng = 7.809007;
  warehouseId: any;
  warehouses: any = [];
  excutiveData: any = [];
  wareHouseList: any;
  lat: number = 22.691528333333334;
  lng: number = 75.928793333333331;
  selectedCities: any[];
  Searchcityids: any;
  dataset: any;
  CityList: any;
  WareHouseId: any;
  ExecutiveId: any;
  CDate: string;
  excutiveRoute: any = [];
  PlannedRoutesdata: any = [];
  ExportPlannedRoutesdata: any = [];
  gpsLogs: any = [];
  ActualRoutesdata: any = [];
  latAstart: number;
  lngAStart: number;
  subcateid: number;
  subcateName: string;
  zoom: number = 12;
  wareHouseId: any;
  excutiveId: any;
  date1: string = ""
  custData: any = []
  plannedArray = []
  actualArray = []
  starttime: any;
  startaddress: any;
  skCodeP: string;
  skCodeA: string;
  latA: number;
  lngA: number;
  dayP: string;
  ShippingAddressP: string;
  dayA: string;
  ShippingAddressA: string;
  visitedOnA: any;
  object: any = [];
  isInvalid: boolean;
  yearRangeForCalender: any;
  WarehouseId: any;
  excutiveModel: any = {
    excutiveId: "",
    CDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
    WarehouseId: ""
  };
  wayPointA: any[];
  wayPointP: any[];
  public destinationlat: any;
  public destinationlg: any;
  public waypointsA: any = [];
  public waypointsP: any = [];
  public originA: any;
  public destinationA: any;
  public originP: any;
  public destinationP: any;
  followMarker: any;
  // markers:marker=[]
  map: any;
  markers: any = [];
  allMarkers: marker[];
  actualmarkers: any = [];
  allactualmarkers: marker[];
  icon = '/assets/img/logo/truck/';
  // lat: number = 22.691528333333334;
  // lng: number = 75.928793333333331;
  isShowDirection: boolean;
  /*name of the excel-file which will be downloaded. */
  fileName = 'ExcelSheet.xlsx';
  blocked:boolean;
  constructor(private ExecutiveService: ExecutiveService, private cityservice: CityService, private exportService: ExportServiceService, private dashboardservice: DashboardService,private router: Router
  ) {
    this.dataset = [];
    this.Searchcityids = {};
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
  }
  GetCityWarehouse(cityes) {
    let cityids = [];
    for (var i in cityes) {
      cityids.push(cityes[i].Cityid)
    }
    if (cityids) {
      this.Searchcityids.cityids = cityids;
      this.blocked = false;
      this.ExecutiveService.GetWarehouseByCityids(this.Searchcityids).subscribe(x => {
        this.blocked = false;
        this.wareHouseList = x;
      });
    } else { alert("Please city "); this.blocked = false; }
  }
  
  onChange(WareHouseId) {
    this.wareHouseList.map(e => {
      e.WarehouseId = WareHouseId;
    });
    this.blocked = true;
    this.ExecutiveService.getExcutiveByWarehouse(WareHouseId).subscribe(res => {
      this.blocked = false;
      this.excutiveData = res;
    })
  }
  search() {
    this.blocked = true;
    this.ExecutiveService.getExcutiveRoute(this.ExecutiveId, this.CDate).subscribe(result => {
      console.log(result, 'data')
      this.blocked = false;
      this.excutiveRoute = result;
      if (this.excutiveRoute.Status == true) {
        //this.messageService.add({severity:'success', summary: 'Customer Found',});
        this.gpsLogs = this.excutiveRoute.customers[0];
        this.PlannedRoutesdata = this.excutiveRoute.customers[0].PlannedRoutes;
        this.ActualRoutesdata = this.excutiveRoute.customers[0].ActualRoutes;
        this.latAstart = this.excutiveRoute.customers[0].DayStartLat;/**origin */
        this.lngAStart = this.excutiveRoute.customers[0].DayStartLng;/**origin */
        //this.loaderService.loading(false);

        /** planned route start*/
        this.wayPointP = [];
        this.PlannedRoutesdata.forEach(item => {
          this.wayPointP.push({
            location: { lat: Number(item.lat), lng: Number(item.lg) },
            stopover: false,
          })
          let obj = {
            location: { lat: Number(item.lat), lng: Number(item.lg) },


          }
          this.waypointsP.push(obj);
        });

        this.originP = { lat: this.wayPointP[0].location.lat, lng: this.wayPointP[0].location.lng, day: this.wayPointP[0].location.day };
        this.destinationP = { lat: this.wayPointP[this.wayPointP.length - 1].location.lat, lng: this.wayPointP[this.wayPointP.length - 1].location.lng, day: this.wayPointP[this.wayPointP.length - 1].location.day };
        this.waypointsP.splice(0, 1);
        this.waypointsP.splice(this.waypointsP.length - 1, 1);


        /** actual route start*/
        this.wayPointA = [];
        this.ActualRoutesdata.forEach(i => {
          this.wayPointA.push({
            location: { lat: Number(i.lat), lng: Number(i.lg), day: String(i.Day) },
            stopover: false,

          })
          let obj = {
            location: { lat: Number(i.lat), lng: Number(i.lg), day: String(i.Day) },
          }
          this.waypointsA.push(obj);
        });
        console.log('this.wayPointA: ', this.wayPointA);
        console.log('this.waypointsA: ', this.waypointsA);
        this.originA = { lat: this.wayPointA[0].location.lat, lng: this.wayPointA[0].location.lng, day: this.wayPointA[0].location.day };
        this.destinationA = { lat: this.wayPointA[this.wayPointA.length - 1].location.lat, lng: this.wayPointA[this.wayPointA.length - 1].location.lng, day: this.wayPointA[this.wayPointA.length - 1].location.day };
        this.waypointsA.splice(0, 1);
        this.waypointsA.splice(this.waypointsA.length - 1, 1);
        this.markerOptions = this.markerOptions;
        /** actual route end*/
        let counter = 0
        this.PlannedRoutesdata.forEach(e => {
          this.markers.push({
            draggable: false,
            icon: this.icon + counter + '.png',
            lat: e.lat,
            lng: e.lg,
            label: (e.Skcode ? (e.Skcode + ' ') : '') + (e.Day ? (e.Day + ' ') : '') + (e.ShippingAddress ? ('(' + e.ShippingAddress + ')') : ''),
            id: e.ShopName
          });
        });
        this.allMarkers = JSON.parse(JSON.stringify(this.markers));
        console.log('allMakers2', this.allMarkers);


        /**custome address for actual */

        this.ActualRoutesdata.forEach(el => {
          this.actualmarkers.push({
            draggable: false,
            icon: this.icon + counter + '.png',
            lat: el.ExecLat,
            lng: el.ExecLng,
            label: (el.Skcode ? (el.Skcode + ' , ') : '') + (el.Day ? (el.Day + ' , ') : '') + (el.ShippingAddress ? ('(' + el.ShippingAddress + ')') : ''),
            id: el.ShopName
          });
        });
        this.allactualmarkers = JSON.parse(JSON.stringify(this.actualmarkers));
        console.log('actualallMakers2', this.allactualmarkers);




        console.log(this.plannedArray, 'array')
        this.PlannedRoutesdata.forEach(x => {
          this.skCodeP = x.Skcode;
          this.destinationlat = x.lat;
          this.destinationlg = x.lg;
          this.dayP = x.Day;
          this.ShippingAddressP = x.ShippingAddress;
        });

        this.starttime = this.excutiveRoute.customers[0].DayStartTime;
        this.startaddress = this.excutiveRoute.customers[0].DayStartAddress;

        this.ActualRoutesdata.forEach(y => {
          this.skCodeA = y.Skcode;
          this.latA = y.lat;
          this.lngA = y.lg;
          this.dayA = y.Day;
          this.ShippingAddressA = y.ShippingAddress;
          this.visitedOnA = y.VisitedOn;
        });
        console.log(this.excutiveRoute, 'excu')
        console.log(this.ActualRoutesdata, 'ActualRoutesdata')
      } else {
        //this.loaderService.loading(false);
        //this.messageService.add({ severity: 'error', summary: 'No Customer Found', detail: '' });
        this.PlannedRoutesdata = '';
      }
    }, error => {
    })
  }
  onExcutiveChange() {
    this.excutiveData;
  }
  Export() {
    
    if (this.PlannedRoutesdata != null) {
      this.ExportPlannedRoutesdata =[];
      this.PlannedRoutesdata.forEach(e => {
        this.ExportPlannedRoutesdata.push({
          lat: e.lat,
          lng: e.lg,
          IsVisited: e.IsVisited,
          VisitedOn: e.VisitedOn,
          Skcode: e.Skcode,
          Day: e.Day,
          BeatNumber: e.BeatNumber,
          ShopName: e.ShopName,
          Name: e.Name,
          IsAssigned: e.IsAssigned,
          City: e.City,
          WarehouseName: e.WarehouseName,
          ClusterName: e.ClusterName
        });
      });
      this.exportService.exportAsExcelFile(this.ExportPlannedRoutesdata, 'PlannedRoutData');
    }
  }
  public markerOptions = {
    origin: {
      infoWindow: 'Origin',
      icon: '',

    },
    waypoints: [

    ],


    destination: {
      infoWindow: 'Destination',
      icon: this.icon,

    },
  };
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon: string;
  id: string;
}