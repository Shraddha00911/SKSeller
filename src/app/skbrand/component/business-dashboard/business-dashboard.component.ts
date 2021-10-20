import { Component, OnInit } from '@angular/core';
// import { timingSafeEqual } from 'crypto';
import { SkbrandService } from '../../services/skbrand.service';
import moment from 'moment';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit{
  allCityName:any;
  allBrandName:any;
  allCatListName:any;
  selectedCat:any;
  catSelctValue: string;
  brandSelctValue: any = [];
  citySelctValue: any  = 0;
  axisSelectValue:string;
  dashboardData: any = [];
  CurrentCompanySale:any = {};
  CompanyInventory:any = {};
  graphAllData: any;
  setSubcateId:any = 0;
  intialLoader :boolean = false;
  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  constructor(
    public _services: SkbrandService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    if(localStorage.getItem("SubCatId")){
      this.setSubcateId = localStorage.getItem("SubCatId");
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

 

  barChartColors = [
    {
      backgroundColor: [
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
      
    },
   
      
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
        'rgba(255,99,132,1)'      ]
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

  selectedItems:any;
  dropdownSettings:any = {};
  async ngOnInit() {
  this.getAllCatList();
  this.dashboardData = [];
  this.CurrentCompanySale = {};
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
    enableSearchFilter: false,
    classes:"myclass",
    badgeShowLimit:2,
    autoPosition: false
  };   
  this.selectDateType("T");
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

  
  
  getAllCatList() {
    this._services.GetAllSubCatMapping().subscribe(result=>{
      this.allCatListName = result;    
      // this.catSelctValue = this.allCatListName[0].Id
      this.getAllWarehouseCity();
      
    })
  }

  getAllWarehouseCity() {
    this._services.GetAllCity().subscribe(result=>{
      this.allCityName = result; 
      // this.citySelctValue = this.allCityName[0].Cityid;
      this.getAllBrandNames();
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
      // this.getAllDashboardData();
    })
  }

  onDateSelect(e){
  console.log(e)
  }  

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      console.log(items);
  }
  onDeSelectAll(items: any){
      console.log(items);
  }


  selectCatValue(catValue,selectType) {
    switch (selectType) {
      case 'Category': {
        this.catSelctValue =  catValue;
        localStorage.setItem('SubCatId', this.catSelctValue);
      
        this.ngOnInit();
        this.getAllBrandNames()
        break
      }
      case 'Brand': {
        this.brandSelctValue.push(catValue);
        // this.getAllDashboardData();
        
        break
      }
      case 'City': {
        this.citySelctValue =  catValue;
        // this.getAllDashboardData();
        break
      }
      
    }
    
  }

  getAllDashboardData() {   
    this.intialLoader = true;
    this.dashboardData = [];
    this.CurrentCompanySale = {};
    this.CompanyInventory = {};
    var brandId = [];
    if(this.selectedItems.length>0){
      this.selectedItems.forEach(element => {
        brandId.push(element['SubSubCategoryId'])
      });
    }

    const searchData = {
      "CompanyId": Number(this.catSelctValue),
      "CityId": this.citySelctValue,
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "BrandIds":brandId,
      "DateRangeType": this.dateType
    }
    this._services.GetBusinessDashboardData(searchData).subscribe(result=>{
      console.log(result)
      if(result){
        this.dashboardData = [];  
        this.CompanyInventory = {};
        this.CurrentCompanySale = {};
        this.dashboardData.push(result); 
        this.CurrentCompanySale = this.dashboardData[0]['CurrentCompanySale'];
        this.CompanyInventory = this.dashboardData[0]['CompanyInventory'];
        this.intialLoader = false;
        console.log(this.dashboardData)
        this.dashboardGraphData()
      }else{
        this.dashboardData = [];
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


  selectCategoryTab(tab){
    this.categorType = tab;
    this.activeClass = "nav-link active";
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

 dashboardGraphData() {    
    var brandId = [];
    if(this.selectedItems.length>0){
      this.selectedItems.forEach(element => {
        brandId.push(element['SubSubCategoryId'])
      });
    }
    const searchData = {
      "CompanyId": Number(this.catSelctValue),
      "CityId": this.citySelctValue,	
      "BrandIds": brandId,
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "Type":  this.categorType
    }
    this._services.GetBusinessDashboardGraphData(searchData).subscribe(result=>{
      console.log(result);

      this.graphAllData = result;
      var arrarOfYAxis = [];
      this.graphAllData.forEach(element => {
        if(this.dateType=="T"){
          element['XAxis'] = moment(element["Xaxis"]).format("HH");
        } else  if(this.dateType=="W"){
          element['XAxis'] = moment(element["Xaxis"]).format("dddd");
        } else  if(this.dateType=="M"){
          element['XAxis'] = moment(element["Xaxis"]).format("MMM");
        } else  if(this.dateType=="C"){
          element['XAxis'] = moment(element["Xaxis"]).format("DD");
        } 

      });
     
      console.log(this.graphAllData)
      console.log(arrarOfYAxis)

      this.dataMonthYAxis = [];
      var dataMonth = [];
      this.graphAllData.forEach(element => {
          this.dataMonthYAxis.push(element["Yaxis"]);
          dataMonth.push(element["XAxis"]);
      })
      // console.log(this.areaChartData)
      this.areaChartData[0]['data'] = this.dataMonthYAxis;
      this.barChartData[0]['data'] = this.dataMonthYAxis;
      switch (this.categorType) {
          case "Sale":
          this.areaChartData[0]['label'] = 'Gross Merchandise Value';
          break;

          case "Dispatch":
          this.areaChartData[0]['label'] = 'Sale Amount';
          break;

          case "AOV":
          this.areaChartData[0]['label'] = 'Average Order Value';
          break;

          case "POC":
          this.areaChartData[0]['label'] = 'Sales Retuen';
          break;

          case "BillCustomer":
          this.areaChartData[0]['label'] = 'Billed Customer';
          break;

          case "CustomerReach":
          this.areaChartData[0]['label'] = 'Customer Reach';
          break;

          case "ALI":
          this.areaChartData[0]['label'] = 'Average Line Item';
          break;

          case "SKUSold":
          this.areaChartData[0]['label'] = 'SKUs Sold';
          break;
      
        default:
          break;
      }

      this.areaChartLabels = dataMonth;
      this.barChartLabels = dataMonth;
      // console.log(this.areaChartData)
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

  barChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];
  barChartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];

  barChartOptions = {
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
