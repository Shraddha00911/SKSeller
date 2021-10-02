import { Component, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { SkbrandService } from '../../services/skbrand.service';
import moment from 'moment';

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
  citySelctValue: string;
  axisSelectValue:string;
  dashboardData: any;
  graphAllData: any;
  
  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

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

  constructor(
    public _services: SkbrandService,
  ) { }

  async ngOnInit() {
  this.getAllCatList();
  }
  
  
  getAllCatList() {
    this._services.GetAllSubCatMapping().subscribe(result=>{
      this.allCatListName = result;      
      this.catSelctValue = this.allCatListName[0].Id
      this.getAllWarehouseCity();
      
    })
  }

  getAllWarehouseCity() {
    this._services.GetAllCity().subscribe(result=>{
      this.allCityName = result; 
      console.log(this.allCityName, 'this.allCityName');      
      this.citySelctValue = this.allCityName[0].Cityid;
      this.getAllBrandNames();
    })
  }

  getAllBrandNames(){
    this._services.GetAllBrand().subscribe(result=>{    
      this.allBrandName = result; 
      console.log("All Brand data",this.allBrandName )
      this.getAllDashboardData();
    })
  }


  selectCatValue(catValue,selectType) {
    switch (selectType) {
      case 'Category': {
        this.catSelctValue =  catValue;
        this.getAllDashboardData();
        break
      }
      case 'Brand': {
        this.brandSelctValue.push(catValue);
        this.getAllDashboardData();
        
        break
      }
      case 'City': {
        this.citySelctValue =  catValue;
        this.getAllDashboardData();
        break
      }
      
    }
    
  }

  getAllDashboardData() {    
    const searchData = {
      "CompanyId": this.catSelctValue,
	"CityId": this.citySelctValue,	
	"BrandIds": this.brandSelctValue,
	"DateRangeType":"M",
  "StartDate":"2021-09-01",
	"EndDate":"2021-09-30 23:59:59",
    }
    this._services.GetBusinessDashboardData(searchData).subscribe(result=>{
      this.dashboardData = result;    
      console.log(this.dashboardData, 'this.dashboardData');
       
      this.dashboardGraphData();
      
    })
  }


 dashboardGraphData() {    
    const searchData = {
      "CompanyId": this.catSelctValue,
      "CityId": this.citySelctValue,	
      "BrandIds": this.brandSelctValue,
      "DateRangeType":"M",
      "StartDate":"2021-09-01",
      "EndDate":"2021-09-30 23:59:59",
    }
    this._services.GetBusinessDashboardGraphData(searchData).subscribe(result=>{
      this.graphAllData = result;
      // console.log( this.graphAllData, 'this.dashboardData gra'); 
      var areaChartLabelsArr = [];  
      var arrarOfYAxis = [];
      this.graphAllData.forEach(element => {
        element['month'] = moment(element["Xaxis"]).format("MMM");
        switch (element['month']) {
          case "Jan":
         // element["arrarOfYAxisJan"] = arrarOfYAxis.push(element["Yaxis"])
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisJan"] = this.calculateAverage(arrarOfYAxis);
          break; 

          case "Feb":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisFeb"] = this.calculateAverage(arrarOfYAxis);
          break;
          
          case "Mar":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisMar"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "Apr":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisApr"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "May":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisMay"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "Jun":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisJun"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "Jul":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisJul"] = this.calculateAverage(arrarOfYAxis);
          break;

          
          case "Aug":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisAug"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "Sep":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisSep"] = this.calculateAverage(arrarOfYAxis);
          break;
          
          case "Oct":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisOct"] = this.calculateAverage(arrarOfYAxis);
          break;

          case "Nov":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisNov"] = this.calculateAverage(arrarOfYAxis);
          break;

                
          case "Dec":
          arrarOfYAxis.push(element["Yaxis"])
          element["arrarOfYAxisDec"] = this.calculateAverage(arrarOfYAxis);
          break;

          default:
            break;
        }

      });
     
      // console.log( this.graphAllData)

      this.dataMonthYAxis = [];
      this.graphAllData.forEach(element => {
        this.areaChartLabels.forEach(ele => {
            if(element['month']==ele){
              var name  = 'arrarOfYAxis' + element['month'];
              this.dataMonthYAxis.push(name)
            }else{
              this.dataMonthYAxis.push(0)
            }
        });
      })
      });

      console.log(this.areaChartData)
      this.areaChartData[0]['data'] = this.dataMonthYAxis;
      this.areaChartData[0]['label'] = 'Grass Merchandise Value';
      console.log(this.areaChartData)

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
