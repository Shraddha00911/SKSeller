import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SkbrandService } from '../../services/skbrand.service';
import moment from 'moment';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  allCityName:any;
  allBrandName:any;
  allCatListName:any;
  selectedCat:any;
  catSelctValue: string;
  brandSelctValue: any = [];
  citySelctValue: any  = 0;
  axisSelectValue:string;
  dashboardData: any = [];
  CurrentCompanySale:any = null;
  CompanyInventory:any = {};
  graphAllData: any;
  setSubcateId:any = 0;
  subCateName:string = '';
  intialLoader :boolean = false;
  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @ViewChild('mapContainer1', {static: false}) gmap1: ElementRef;

  constructor(
    public _services: SkbrandService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    if(localStorage.getItem("SubCatId")){
      this.setSubcateId = localStorage.getItem("SubCatId");
      this.subCateName = localStorage.getItem("subcateName");
      this.catSelctValue = this.setSubcateId;
    }
   }

   

   hoveredDate: NgbDate | null = null;

   fromDate: NgbDate | null;
   toDate: NgbDate | null;
   rangeDate :any = null
   displayMonths = 2;
   navigation = 'select';
   showWeekNumbers = false;
   outsideDays = 'visible';

   onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.rangeDate = this.fromDate['year']+"-"+this.fromDate['month']+"-"+this.fromDate['day'];
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      var startDate = this.fromDate['year']+"-"+this.fromDate['month']+"-"+this.fromDate['day'];
      var endDate = this.toDate['year']+"-"+this.toDate['month']+"-"+this.toDate['day'];
      this.rangeDate = this.fromDate['year']+"-"+this.fromDate['month']+"-"+this.fromDate['day']+" to "+this.toDate['year']+"-"+this.toDate['month']+"-"+this.toDate['day'];
      this.startDate = startDate;
      this.endDate = endDate;
      this.startDate = this.startDate + " "+ "00:00:00";
      this.endDate = this.endDate + " "+ "23:59:59";
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.rangeDate = this.fromDate['year']+"-"+this.fromDate['month']+"-"+this.fromDate['day'];
    }   
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  datepickerOpen(){
    this.toDate = null;
    this.fromDate = null;
    this.dateType = "C";
    this.rangeDate = null;
  }

  lineChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(23,96,209,1)',
      backgroundColor: 'rgba(23,96,209,.2)'
    }
  ];


  doughnutPieChartData = [
    {
      data: [30, 40, 30],
    }
  ];

  doughnutPieChartLabels = ["Pink", "Blue", "Yellow"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];


  scatterChartData = [
    {
      label: 'First Dataset',
      data: [{
          x: -10,
          y: 0
        },
        {
          x: 0,
          y: 3
        },
        {
          x: -25,
          y: 5
        },
        {
          x: 40,
          y: 5
        }
      ],
      borderWidth: 1
    },
    
    {
      label: 'Second Dataset',
      data: [{
          x: 10,
          y: 5
        },
        {
          x: 20,
          y: -30
        },
        {
          x: -25,
          y: 15
        },
        {
          x: -10,
          y: 5
        }
      ],
      borderWidth: 1
    }
  ];

  scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  scatterChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)' ]
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];

  selectedItems:any = [];
  dropdownSettings:any = {};

  heatmapAmount:any
  heatmapQty:any
  companyHeatmapDataAmount:any = []
  companyHeatmapDataQty:any=[]
  map: any;
  google:any;

  brandHeatMapArr:any = [];
  brandheatmapDataTotalQty:any = [];
  brandheatmapDataTotalSale:any = [];

  
    BrandAmount:any = [];
    BrandQty :any = [];
    ItemAmount:any = [];
    ItemQty:any = [];
    brandSaleAmountbarChartData:any = [];
    brandSaleAmountbarChartLabels : string[] = [];
    itemSaleAmountbarChartData:any = [];
    itemSaleAmountbarChartLabels : string[] = [];
    soldQuantityAmountbarChartData:any = [];
    soldQuantitybarChartLabels : string[] = [];
    soldItemsbarChartData:any = [];
    soldItembarChartLabels : string[] = [];
    selectedBrandSale:any;
    brandSaleObj:any = {};
    brandHeatmapTotalQty:any
    brandHeatmapTotalSale:any
    brandMap: any;

  ngOnInit() {
  this.getAllCatList();
  this.selectDateType("T");
  this.dashboardData = [];
  this.CurrentCompanySale = null;
  this.CompanyInventory = {};
  this.intialLoader = false;

  this.fromDate =  null;
  this.toDate = null;
  this.allBrandName = []
  this.selectedItems = [];
  this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Brand",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass",
    badgeShowLimit:2
  };   

  //All Variable for Map(D)
  this.companyHeatmapDataAmount = [];
  this.companyHeatmapDataQty = [];

  this.brandHeatMapArr = [];
  this.brandheatmapDataTotalQty = [];
  this.brandheatmapDataTotalSale = [];

  this.brandSaleObj = {};
  var backgroundColor = [];
  var backgroundColorBorder = [];
  for (let index = 0; index <100; index++) {
       const rgva_color = this.random_rgba()
       backgroundColor.push(rgva_color)
       backgroundColorBorder.push(rgva_color)
  }

  this.barChartColors = [{
    backgroundColor : backgroundColor,
    borderColor : backgroundColorBorder
  }]
 
}

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
 }

  barChartColors = [
    {
      backgroundColor: [
        'rgba(163, 161, 251, 1)',
        'rgba(250, 100, 200, 1)',
        'rgba(123, 165, 87, 1)',
        'rgba(181, 115, 255, 1)',
        'rgba(133, 223, 151, 1)',
        'rgba(163, 64, 18, 0.5)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
      ],
      borderColor: [
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
      ],
    }];

  ngAfterViewInit(): void {
    // Load google maps script after view init
    // const DSLScript = document.createElement('script');
    // DSLScript.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization&key=AIzaSyC9QVbsRyWGaEqMU3langey0mvjnuOHLD8'; // replace by your API key
    // DSLScript.type = 'text/javascript';
    // document.body.appendChild(DSLScript);
    // document.body.removeChild(DSLScript);
    var mapOptions = {center: new google.maps.LatLng(22.7271633333333,75.88144), zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP};        
    this.map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);     
    this.map = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);     
  }


gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]

    fgradient = ['rgba(185, 185, 203, 0)', 'rgba(145, 145, 192, 0)',
      'rgba(65, 65, 207, 0)', 'rgba(30, 30, 229, 1)',
      'rgba(0, 185, 255, 1)', 'rgba(0, 255, 215, 1)',
      'rgba(0, 255, 15, 1)', 'rgba(0, 255, 0, 1)',
      'rgba(255, 255, 0, 1)', 'rgba(255, 235, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ];

companyHeatMapArr:any = [];

GetCompanyHeatMapData() {  
  this.companyHeatMapArr = [];  
  const searchData = {
    "Id": Number(this.catSelctValue),
    "CityId": Number(this.citySelctValue),
     "startDate": this.startDate,
    "endDate": this.endDate
          
  }
  this._services.GetCompanyHeatMapData(searchData).subscribe(result=>{
    if(result){
      this.companyHeatMapArr = []; 
      this.companyHeatMapArr = result; 
      console.log(this.companyHeatMapArr)
      this.companyHeatMapArr.forEach(element => {
        this.companyHeatmapDataAmount.push(
          {location: new google.maps.LatLng(element['Lat'],element['Lg']), weight:element['TotalQty']},
        );
        this.companyHeatmapDataQty.push(
          {location: new google.maps.LatLng(element['Lat'],element['Lg']), weight:element['TotalSale']},
        )
      });
    }else{
      this.companyHeatMapArr = [];
      this.intialLoader = false;
    }
  },(err)=>{
    this.dashboardData = [];
  })
}

heatInitialize() {      
  var mapOptions = {center: new google.maps.LatLng(this.companyHeatMapArr[0]['Lat'],this.companyHeatMapArr[0]['Lg']), zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP};        
  this.map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);      
 //  this.map = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);      

  this.heatmapAmount = new google.maps.visualization.HeatmapLayer({data: this.companyHeatmapDataAmount, radius: 50,gradient: this.gradient}); 
  this.heatmapAmount.setMap(this.map); 
  
  this.heatmapQty = new google.maps.visualization.HeatmapLayer({data: this.companyHeatmapDataQty, radius: 50,gradient: this.gradient});
  this.heatmapQty.setMap(this.map);
}

toggleHeatmap() {
 this.heatmapAmount.setMap(this.heatmapAmount.getMap() ? null : this.map);
}


GetBrandHeatMapData() {   
  const searchData = {
    // "Id": Number(this.brandSelctValue),
    "Id": Number(this.brandId),
    "CityId": Number(this.citySelctValue),
    "StartDate": this.startDate,
    "EndDate": this.endDate,
    "DateRangeType": this.dateType
  }
  this._services.GetBrandHeatMapData(searchData).subscribe(result=>{
    if(result){
      this.brandHeatMapArr = []; 
      this.brandHeatMapArr = result; 
      this.brandHeatMapArr.forEach(element => {
        this.brandheatmapDataTotalQty.push(
          {location: new google.maps.LatLng(element['Lat'],element['Lg']), weight:element['TotalQty']},
        );
        this.brandheatmapDataTotalSale.push(
          {location: new google.maps.LatLng(element['Lat'],element['Lg']), weight:element['TotalSale']},
        )
      });

    this.brandMapinitialize()
    this.brandMaptoggleHeatmap() 
    }else{
      this.dashboardData = [];
      this.CurrentCompanySale = null;
      this.intialLoader = false;
    }
  },(err)=>{
    this.dashboardData = [];
  })
}

  brandMapinitialize() {      
    var mapOptions = {center: new google.maps.LatLng(this.brandHeatMapArr[0]['Lat'],this.brandHeatMapArr[0]['Lg']), zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP};        
    this.brandMap = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);      
  //  this.map = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);      

    this.brandHeatmapTotalQty = new google.maps.visualization.HeatmapLayer({data: this.brandheatmapDataTotalQty, radius: 50,gradient: this.gradient}); 
    this.brandHeatmapTotalQty.setMap(this.brandMap); 
    
    this.brandHeatmapTotalSale = new google.maps.visualization.HeatmapLayer({data: this.brandheatmapDataTotalSale, radius: 50,gradient: this.gradient});
    this.brandHeatmapTotalSale.setMap(this.brandMap);
  }

  brandMaptoggleHeatmap() {
  this.brandHeatmapTotalQty.setMap(this.brandHeatmapTotalQty.getMap() ? null : this.brandMap);
  }
  
  getAllCatList() {
    this._services.GetAllSubCatMapping().subscribe(result=>{
      this.allCatListName = result;    
      this.getAllWarehouseCity();
      
    })
  }

  getAllWarehouseCity() {
    this._services.GetAllCity().subscribe(result=>{
      this.allCityName = result; 
      // this.citySelctValue = this.allCityName[0].Cityid;
      // this.getAllBrandNames();
    })
  }

  getAllBrandNames(){
    this._services.GetAllBrand().subscribe(result=>{    
      this.allBrandName = result; 
      this.allBrandName.forEach((element,index) => {
        element['id'] = index
        element['itemName'] = element['SubSubCategoryName'];
        element['SubSubCategoryId'] = element['SubSubCategoryId'];
      });
    })
  }

  onDateSelect(e){
  console.log(e)
  }  

  onItemSelect(item:any){
  }
  OnItemDeSelect(item:any){
  }
  onSelectAll(items: any){
  }
  onDeSelectAll(items: any){
  }


  selectCatValue(catValue,selectType) {
    switch (selectType) {
      case 'Category': {
        this.catSelctValue =  catValue;
        localStorage.setItem('SubCatId', this.catSelctValue);
        this.allCatListName.forEach(element => {
          if(element['SubCategoryId']==catValue){
             this.subCateName = element['SubcategoryName'];
            localStorage.setItem('SubcategoryName', this.subCateName);
          }
        });
        break
      }
      case 'Brand': {
        this.brandSelctValue.push(catValue);
        
        break
      }
      case 'City': {
        this.citySelctValue =  catValue;
        break
      }
      
    }
    
  }

  getAllDashboardData() {   
    this.intialLoader = true;
    this.dashboardData = [];
    this.CurrentCompanySale = null;
    this.CompanyInventory = {};
    this.brandSaleObj = {};
    var brandId = [];
    if(this.selectedItems.length>0){
      this.selectedItems.forEach(element => {
        brandId.push(element['SubSubCategoryId'])
      });
    }

    const searchData = {
      "CompanyId": Number(this.catSelctValue),
      "CityId": Number(this.citySelctValue),
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "DateRangeType": this.dateType
    }
    this._services.GetCompanySale(searchData).subscribe(result=>{
       console.log(result)
       this.dashboardGraphData()
      if(result){
        this.dashboardData = [];  
        this.CompanyInventory = {};
        this.CurrentCompanySale = {};
        this.dashboardData.push(result); 
        this.CurrentCompanySale = result;
        this.tabObj = {
          "name" : "Gross Merchandise Value",
          "value":  this.CurrentCompanySale['TotalSale']
         }
        this.intialLoader = false;
      }else{
        this.dashboardData = [];
        this.CurrentCompanySale = null;
        this.intialLoader = false;
      }
      // this.dashboardGraphData();
    },(err)=>{
      this.dashboardData = [];
    })
  }

  categorType:any = "Sale";
  activeClass:any;
  startDate:any
  endDate:any;
  dateType:string = "T";
  todayDate:string = "Today Date"
  cityId:any = 0;
  tabObj:any = {
   "name" : "Gross Merchandise Value",
   "value": 0
  }

  selectCategoryTab(tab,tabName,tabValue){
    this.categorType = tab;
    this.activeClass = "nav-link active";
    this.tabObj = {
      "name" : tabName,
      "value" : tabValue,
    }
    this.dashboardGraphData()
   } 

  selectDateType(type){
  this.dateType = type
  // this.dashboardGraphData()
  switch (type) {
    case "T":
      this.startDate = moment().format("YYYY-MM-DD");
      this.endDate = moment().format("YYYY-MM-DD");
      this.todayDate = this.startDate;
      this.startDate = this.startDate + " "+ "00:00:00";
      this.endDate = this.endDate + " "+ "23:59:59";
      break;
    case "W":
      this.startDate = moment().subtract(7,'d').format("YYYY-MM-DD");
      this.endDate = moment().format("YYYY-MM-DD");
      this.startDate = this.startDate + " "+ "00:00:00";
      this.endDate = this.endDate + " "+ "23:59:59";
      break;
  
    case "M":
      this.startDate = moment().subtract(30,'d').format("YYYY-MM-DD");
      this.endDate = moment().format("YYYY-MM-DD");
      this.startDate = this.startDate + " "+ "00:00:00";
      this.endDate = this.endDate + " "+ "23:59:59";
      break;

    case "C":
        this.startDate = moment().format("YYYY-MM-DD");
        this.endDate = moment().format("YYYY-MM-DD");
        this.startDate = this.startDate + " "+ "00:00:00";
        this.endDate = this.endDate + " "+ "23:59:59";
        break;
    
    default:
      break;
  }
  this.getAllDashboardData();
  } 

  brandSaleChartData = [{
    label: 'Sales in Amount',
    data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  brandSalebarChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          callback: function(label, index, labels) {
              return label/1000+'k';
          }
      }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    
  };

  itemSaleChartData = [{
    label: 'Item Sales in Amount',
    data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  itemSalebarChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(label, index, labels) {
            return label/1000+'k';
        }
        }
      }],
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    
  };


soldQuantityChartData = [{
    label: 'Sold Quantity',
    data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

soldQuantitybarChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(label, index, labels) {
              return label/1000+'k';
          }
      }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    
  };

soldItemChartData = [{
  label: 'Sold Item',
  data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
  borderWidth: 1,
  fill: false
}];

soldItembarChartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        // callback: function(label, index, labels) {
        //   return label/1000+'k';
        // }
      }
    }],
  
  },
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  
};


 dashboardGraphData() {    
    var brandId = [];
    this.brandSaleAmountbarChartData = [];
    this.brandSaleAmountbarChartLabels = [];
    this.itemSaleAmountbarChartData = [];
    this.itemSaleAmountbarChartLabels = [];
    this.soldQuantityAmountbarChartData = [];
    this.soldQuantitybarChartLabels = [];
    this.soldItemsbarChartData = [];
    this.soldItembarChartLabels = [];
    this.brandSaleObj = {}
    if(this.selectedItems.length>0){
      this.selectedItems.forEach(element => {
        brandId.push(element['SubSubCategoryId'])
      });
    }
    const searchData = {
      "CompanyId": Number(this.catSelctValue),
      "CityId": Number(this.citySelctValue),	
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "Type":  this.categorType
    }
    this._services.GetCompanySaleGraph(searchData).subscribe(result=>{
      console.log(result);
      this.GetCompanyHeatMapData();
      this.BrandAmount = result['BrandAmount'];
      this.BrandQty = result['BrandQty'];
      this.ItemAmount = result['ItemAmount'];
      this.ItemQty = result['ItemQty'];


      this.BrandAmount.forEach(element => {
          this.brandSaleAmountbarChartLabels.push(element['Name'])
          this.brandSaleAmountbarChartData.push(element['Amount']);
      });

      this.brandSaleChartData[0]['data'] = this.brandSaleAmountbarChartData;


      this.BrandQty.forEach(element => {
        this.soldQuantitybarChartLabels.push(element['Name']);
        this.soldQuantityAmountbarChartData.push(element['Qty']);
      });

      this.soldQuantityChartData[0]['data'] = this.soldQuantityAmountbarChartData;


      this.ItemAmount.forEach(element => {
        this.itemSaleAmountbarChartLabels.push(element['Name']);
        // element['Amount'] = element['Amount']/1000;
        // element['Amount'] = element['Amount'] +"K";
        this.itemSaleAmountbarChartData.push(element['Amount']);
      });

      this.itemSaleChartData[0]['data'] = this.itemSaleAmountbarChartData;


      this.ItemQty.forEach(element => {
        this.soldItembarChartLabels.push(element['Name'])
        this.soldItemsbarChartData.push(element['Qty'])
      });

      this.soldItemChartData[0]['data'] = this.soldItemsbarChartData;
  
      },(err)=>{
        this.graphAllData = [];
      });
    
  }



  dataMonthYAxis = []
  areaChartData = [{
    label: '# of Votes',
    data: [20,18,15,16,12,13,14,10,7,9,0,5],
    borderWidth: 1,
    fill: true
  }];

  // areaChartLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
  areaChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  arry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


  barChartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          callback: function(label, index, labels) {
              return label/1000+'k';
          }
      }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    
  };


  brandId:number = 0;
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    if(active && active[0]['_view'] && active[0]['_view']['label']){
      this.selectedBrandSale = active[0]['_view']['label'];

      this.BrandAmount.forEach(element => {
           if(element['Name'] == this.selectedBrandSale){
                var brandSaleObj = element;
                var progressBarObj = {};
                progressBarObj['TotalSale'] =  (100 * brandSaleObj['Amount']) / this.tabObj['value'];
                progressBarObj['TotalSale'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['TotalSale'].toFixed(2),
                  'progressClass' : progressBarObj['TotalSale'].toFixed(0)+"%",
                } 
                progressBarObj['label'] = brandSaleObj['Name'];
                
                progressBarObj['TotalPOCAmt'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['TotalPOCAmt'];
                progressBarObj['TotalPOCAmt'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['TotalPOCAmt'].toFixed(2),
                  'progressClass' : progressBarObj['TotalPOCAmt'].toFixed(0)+"%",
                } 

                progressBarObj['AverageOrderValue'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['AverageOrderValue'];
                progressBarObj['AverageOrderValue'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['AverageOrderValue'].toFixed(2),
                  'progressClass' : progressBarObj['AverageOrderValue'].toFixed(0)+"%",
                } 

                progressBarObj['TotalDispatchAmt'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['TotalDispatchAmt'];
                progressBarObj['TotalDispatchAmt'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['TotalDispatchAmt'].toFixed(2),
                  'progressClass' : progressBarObj['TotalDispatchAmt'].toFixed(0)+"%",
                } 

                progressBarObj['AvgLineItem'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['AvgLineItem'];
                progressBarObj['AvgLineItem'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['AvgLineItem'].toFixed(2),
                  'progressClass' : progressBarObj['AvgLineItem'].toFixed(0)+"%",
                } 

                progressBarObj['SkuSold'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['SkuSold'];
                progressBarObj['SkuSold'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['SkuSold'].toFixed(2),
                  'progressClass' : progressBarObj['SkuSold'].toFixed(0)+"%",
                } 


                progressBarObj['TotalDispatchAmt'] =  (100 * brandSaleObj['Amount']) / this.CurrentCompanySale['TotalDispatchAmt'];
                progressBarObj['TotalDispatchAmt'] =  {
                  'progressAmount':  brandSaleObj['Amount'],
                  'label':  brandSaleObj['Name'],
                  'progressPercentage' : progressBarObj['TotalDispatchAmt'].toFixed(2),
                  'progressClass' : progressBarObj['TotalDispatchAmt'].toFixed(0)+"%",
                } 

                this.brandSaleObj = progressBarObj;
                this.brandId = brandSaleObj['Id']
               console.log(this.brandSaleObj);
           }
      });
      
      this.heatInitialize()
      this.toggleHeatmap();
      this.GetBrandHeatMapData()

    }
    /* from https://github.com/chartjs/Chart.js/issues/2292 */
    // document.getElementById("myChart").onclick = function (evt) {
    //   var activePoints = myChart.getElementsAtEventForMode(evt, 'point', myChart.options);
    //   var firstPoint = activePoints[0];
    //   var label = myChart.data.labels[firstPoint._index];
    //   var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
    //   alert(label + ": " + value);
    // };
  }


calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total += item;
        count++;
    });
    return total / count;
}

}
