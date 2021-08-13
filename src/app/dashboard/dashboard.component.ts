import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { CityService } from '../shared/services/dashboard/city.service';
import { DashboardService } from '../shared/services/dashboard/dashboard.service';
import { SellerSalesDc } from './seller-sales-dc';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from '../shared/services/export-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subcateid: any;
  CityList: any;
  cityid: any;
  blocked: boolean;
  totalMarginPercent: any;
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
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  barChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

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
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86,1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  areaChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
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
        'rgba(94, 224, 250, 1)',
        'rgba(115, 163, 248, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderColor: [
        'rgba(94, 224, 250, 1)',
        'rgba(115, 163, 248, 1)',
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
        'rgba(255, 99, 132, 1)'
      ],
      borderColor: [
        'rgba(255,99,132,1)']
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 1)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];
  isLoading: boolean;
  IsPurchase: boolean;

  DashboardPoStatusCount: any;
  DashboardOrderStatusData: any;
  DashboardOrderFillRate: any;
  DashboardOrderAvgTAT: any;
  DashboardCurrentVsNetCurrent: any;
  SellerSales: SellerSalesDc;

  CatelogueItemWithCFRChartData: any;
  CatelogueItemWithCFRChartLabels: any;
  CatelogueItemTotalActiveChartData: any;
  CatelogueItemTotalActiveChartLabels: any;
  DashboardCurrentVsNetCurrentChartData: any;
  DashboardCurrentVsNetCurrentLabels: any;
  DashboardOrderStatusDataChartData: any;
  DashboardOrderStatusDataLabels: any;
  DashboardPoStatusCountChartData: any;
  DashboardPoStatusCountDataLabels: any;

  DashboardPoStatusAmountChartData: any;
  DashboardPoStatusAmountDataLabels: any;

  POGRIRCountChartData: any;
  POGRIRCountChartDataLabels: any;


  POGRIRAmountChartData: any;
  POGRIRAmountChartDataLabels: any;
  POGRIRData: any;
  IsPurchasegrIr: boolean;
  PoShowType: boolean;
  showPOCountValue: boolean = false;
  showPOGRIRAmountValue: boolean = false;
  SearchData: any;
  BrandEarnData: any;

  WarehouseData: any;
  // Warehouseid: any;
  subcateName: string;
  POFillRate: any;
  POAvgTAT: any;
  Paretotype: any;
  itemnumber: any;
  selectedCities: any;
  cityids: any;
  Searchcityids: any;
  warehouse: any;
  export: any;
  IsExportable: boolean;
  LedgerList: any;
  SelectedMarginCities: any;
  constructor(private router: Router, private cityservice: CityService, private dashboardservice: DashboardService, private exportService: ExportServiceService) {
    this.SearchData = {};
    this.BrandEarnData = {};

    this.Searchcityids = {};
  }
  async ngOnInit() {

    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');


    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }

    this.IsExportable = JSON.parse(localStorage.getItem('IsExportable'));


    this.SearchData.FromDate = new Date();
    this.SearchData.FromDate = new Date(this.SearchData.FromDate.setHours(0, 0, 0, 0));
    this.SearchData.ToDate = new Date();

    // this.SearchData.StartDate = new Date();
    // this.SearchData.StartDate = new Date(this.SearchData.StartDate.setHours(0, 0, 0, 0));
    // this.SearchData.EndDate = new Date();
    this.SearchData.SubCatId = this.subcateid;
    this.blocked = true;

    this.cityservice.GetAllCity().subscribe(async x => {

      this.CityList = x;
      this.blocked = false;
      if (this.CityList && this.CityList.length > 0) {
        this.selectedCities = [this.CityList[0]];
        await this.GetCityWarehouse();
        this.Search();

        if (this.WarehouseData && this.WarehouseData.length > 0) {
          this.warehouse = this.WarehouseData[0];
          this.getCatlogData(this.WarehouseData[0]);
        }
      }

    });
  }

  async GetCityWarehouse() {

    this.DashboardCurrentVsNetCurrent = null;
    this.CatelogueItemTotalActiveChartData = null;
    this.CatelogueItemTotalActiveChartLabels = null;
    this.SellerSales = null;
    this.DashboardPoStatusCount = null;
    this.DashboardOrderStatusDataChartData = null;
    this.DashboardOrderStatusDataLabels = null;
    this.DashboardOrderStatusData = null;
    this.DashboardOrderFillRate = null;
    this.POFillRate = null;
    this.POAvgTAT = null;
    this.DashboardOrderAvgTAT = null;
    this.DashboardCurrentVsNetCurrentChartData = null;
    this.DashboardCurrentVsNetCurrentLabels = null;
    this.CatelogueItemWithCFRChartData = null;
    this.CatelogueItemWithCFRChartData = null;
    this.DashboardPoStatusCountChartData = null;
    this.DashboardPoStatusCountDataLabels = null;
    this.DashboardPoStatusAmountChartData = null;
    this.DashboardPoStatusAmountDataLabels = null;
    this.POGRIRData = null;
    this.POGRIRCountChartData = null;
    this.POGRIRCountChartDataLabels = null;
    this.POGRIRAmountChartData = null;
    this.POGRIRAmountChartDataLabels = null;
    this.CatelogueItemTotalActiveChartData = null;
    this.CatelogueItemTotalActiveChartLabels = null;
    this.LedgerList = null;
    let cityids = [];
    for (var i in this.selectedCities) {
      cityids.push(this.selectedCities[i].Cityid)
    }
    if (cityids) {
      this.SearchData.CityIds = cityids;
      this.cityids = cityids;
      this.Searchcityids.cityids = cityids;
      this.blocked = true;
      this.WarehouseData = await this.dashboardservice.GetWarehouseByCityids(this.Searchcityids).toPromise();
      this.blocked = false;

      // this.Warehouseid = this.WarehouseData[0].WareHouseId;
      this.cityid = this.WarehouseData[0].Cityid;

    }
    else { alert("Please city ") }
  }


  Search() {

    if (this.cityid > 0 && this.Search && this.SearchData.CityIds.length > 0) {
      //Catelog
      this.blocked = true;
      this.DashboardCurrentVsNetCurrent = null;
      this.DashboardOrderStatusData = null;

      this.CatelogueItemTotalActiveChartData = null;
      this.CatelogueItemTotalActiveChartLabels = null;
      this.SellerSales = null;
      this.DashboardPoStatusCount = null;
      this.DashboardOrderStatusDataChartData = null;
      this.DashboardOrderStatusDataLabels = null;
      this.DashboardOrderFillRate = null;
      this.POFillRate = null;
      this.POAvgTAT = null;
      this.DashboardOrderAvgTAT = null;
      this.DashboardCurrentVsNetCurrentChartData = null;
      this.DashboardCurrentVsNetCurrentLabels = null;
      this.CatelogueItemWithCFRChartData = null;
      this.CatelogueItemWithCFRChartData = null;
      this.DashboardPoStatusCountChartData = null;
      this.DashboardPoStatusCountDataLabels = null;
      this.DashboardPoStatusAmountChartData = null;
      this.DashboardPoStatusAmountDataLabels = null;
      this.POGRIRData = null;
      this.POGRIRCountChartData = null;
      this.POGRIRCountChartDataLabels = null;
      this.POGRIRAmountChartData = null;
      this.POGRIRAmountChartDataLabels = null;
      this.LedgerList = null;

      this.isLoading = true;

      //GetSellerSales
      this.isLoading = true;
      this.dashboardservice.GetSellerSales(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;
        this.SellerSales = x
      }, error => {
        alert('Something went wrong in Get Seller Sales');
      });
      //DashboardPoStatusCountDc
      this.isLoading = true;
      this.showPOCountValue = false;
      this.IsPurchase == false;
      this.dashboardservice.GetDashboardPoStatusCount(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;
        
        this.DashboardPoStatusCount = x;

        if ((x.PendingPOCount + x.PartialPOCount + x.ClosedPOCount + x.CancelPOCount) == 0) {
          this.IsPurchase = true;
        }


        this.DashboardPoStatusCountChartData = [
          {
            data: [x.PendingPOCount, x.PartialPOCount, x.ClosedPOCount, x.CancelPOCount]
          }
        ];
        this.DashboardPoStatusCountDataLabels = ["PendingPO", 'PartialPO', "ClosedPO", 'CancelPO'];
      }, error => {
        alert('Something went wrong in PoStatusCount');
      });
      //DashboardOrderStatusData
      this.isLoading = true;
      this.dashboardservice.GetDashboardOrderStatusData(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;
        this.DashboardOrderStatusData = x;
        this.DashboardOrderStatusDataChartData = [
          {
            data: [x.PendingOrdercount, x.ReadytoDispatchOrdercount, x.IssuedOrdercount, x.ShippedOrdercount, x.DeliveryRedispatchOrdercount, x.DeliveryCanceledOrdercount, x.PreCanceledOrdercount]
          }
        ];
        this.DashboardOrderStatusDataLabels = ['Pending', "RTD", 'Issued', "Shipped", "DelRedispatch", "DelCanceled", "Pre Canceled"];
      }, error => {
        alert('Something went wrong in Get Dashboard Order Status Data');
      });
      //DashboardOrderFillRate
      this.isLoading = true;
      this.dashboardservice.GetDashboardOrderFillRate(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;

        this.DashboardOrderFillRate = x;
      }, error => {
        alert('Something went wrong in Get DashboardOrderFillRate');
      });

      //POFillRate
      this.isLoading = true;
      this.dashboardservice.GetPOFillRate(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;
        this.POFillRate = x
      }, error => {
        alert('Something went wrong in Get POFillRate');
      });

      //POAvgTAT
      this.isLoading = true;
      this.dashboardservice.GetPOAvgTAT(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;

        this.POAvgTAT = x
      }, error => {
        alert('Something went wrong in Get DashboardOrderAvgTAT');
      });

      //DashboardOrderAvgTAT
      this.isLoading = true;
      this.dashboardservice.GetDashboardOrderAvgTAT(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;

        this.DashboardOrderAvgTAT = x
      }, error => {
        alert('Something went wrong in Get DashboardOrderAvgTAT');
      });
      //DashboardCurrentVsNetCurrent
      this.isLoading = true;
      this.dashboardservice.GetDashboardCurrentVsNetCurrent(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;
        this.DashboardCurrentVsNetCurrent = x
        //CatelogueItemTotalActive
        this.DashboardCurrentVsNetCurrentChartData = [
          {
            data: [x.CurrentStockAmount, x.CurrentNetStockAmount]
          }
        ];
        this.DashboardCurrentVsNetCurrentLabels = ['CurrentStock', "CurrentNetStock"];

      }, error => {
        alert('Something went wrong in Get DashboardCurrentVsNetCurrent');
      });


      //POGRIRCount
      this.isLoading = true;
      this.showPOGRIRAmountValue = false;
      this.IsPurchasegrIr = false;

      this.dashboardservice.GetPOGRIRCount(this.SearchData).subscribe((x: any) => {
        this.isLoading = false;

        this.POGRIRData = x;
       
        if ((x.POCount + x.GRCount + x.IRCount) == 0) {
          this.IsPurchasegrIr = true;
        }
        this.POGRIRCountChartData = [
          {
            data: [x.POCount, x.GRCount, x.IRCount]
          }
        ];
        this.POGRIRCountChartDataLabels = ['PO', 'GR', "IR"];
        this.blocked = false;

      }, error => {
        alert('Something went wrong in  PO GR IR Count');
      });
      this.GetMargin();

      //Pareto
      // this.isLoading = true;
      // this.dashboardservice.GetPareto(this.SearchData, this.Paretotype, this.itemnumber).subscribe((x: any) => {
      //   this.isLoading = false;
      //   this.SellerSales = x;
      // }, error => {
      //  // alert('Something went wrong in Get Seller Sales');
      // });


      if (this.WarehouseData && this.WarehouseData.length > 0) {
    
        this.warehouse = this.WarehouseData[0];
        this.getCatlogData(this.WarehouseData[0]);
      }
    
    } else {
      alert("select city"); this.blocked = false;
    }
  }

  getCatlogData(warehouse) {

    if (warehouse.WareHouseId) {
      this.blocked = true;
      this.CatelogueItemWithCFRChartData = null;
      this.CatelogueItemWithCFRChartData = null;
      this.CatelogueItemTotalActiveChartData = null;
      this.CatelogueItemTotalActiveChartLabels = null;
      this.dashboardservice.GetCatelogueItemWithCFR(warehouse.Cityid, warehouse.WareHouseId).subscribe((x: any) => {
        this.isLoading = false;
        this.blocked = false;
        //CatelogueItemTotalActive
        this.CatelogueItemTotalActiveChartData = [
          {
            data: [x.TotalItem, x.Activeitem]
          }
        ];
        this.CatelogueItemTotalActiveChartLabels = ['Total Item', "Active Item"];
        //Fill rate
        this.CatelogueItemWithCFRChartData = [
          {
            data: [x.TotalCFRItem, x.CFRItem]
          }
        ];
        this.CatelogueItemWithCFRChartLabels = ['Total CFR Item', "Active Item"];
      }, error => {
        alert('Something went wrong in Get Catelogue Item With CFR');
      });

    } else {
      alert('Select warehouse ');
    }
  }

  showPOtypeChange(valuetype) {
  
    this.DashboardPoStatusCountChartData = null;
    this.DashboardPoStatusCountDataLabels = null;
    this.DashboardPoStatusAmountChartData = null;
    this.DashboardPoStatusAmountDataLabels = null;
    if (valuetype == 'true') {
      this.showPOCountValue = true;
    }
    else {
      this.showPOCountValue = false;
    }

    if (this.showPOCountValue == false) {
      this.DashboardPoStatusCountChartData = [
        {
          data: [this.DashboardPoStatusCount.PendingPOCount, this.DashboardPoStatusCount.PartialPOCount, this.DashboardPoStatusCount.ClosedPOCount, this.DashboardPoStatusCount.CancelPOCount]
        }
      ];
      this.DashboardPoStatusCountDataLabels = ["PendingPO", 'PartialPO', "ClosedPO", 'CancelPO'];
    }
    else {
      this.DashboardPoStatusAmountChartData = [
        {
          data: [this.DashboardPoStatusCount.PendingPOAmount, this.DashboardPoStatusCount.PartialPOAmount, this.DashboardPoStatusCount.ClosedPOAmount, this.DashboardPoStatusCount.CancelPOAmount]
        }
      ];
      this.DashboardPoStatusAmountDataLabels = ["Pending Amount", 'Partial Amount', 'Closed Amount', 'Cancel Amount'];
    }
  }



  showPOGRIRChange(valuetype) {
 
    this.POGRIRCountChartData = null;
    this.POGRIRCountChartDataLabels = null;
    this.POGRIRAmountChartData = null;
    this.POGRIRAmountChartDataLabels = null;
    if (valuetype == 'true') {
      this.showPOGRIRAmountValue = true;
    }
    else {
      this.showPOGRIRAmountValue = false;
    }

    if (this.showPOGRIRAmountValue == false) {
      this.POGRIRCountChartData = [
        {
          data: [this.POGRIRData.POCount, this.POGRIRData.GRCount, this.POGRIRData.IRCount]
        }
      ];
      this.POGRIRCountChartDataLabels = ['PO', 'GR', "IR"];
    }
    else {
      this.POGRIRAmountChartData = [
        {
          data: [this.POGRIRData.POAmount, this.POGRIRData.GRAmount, this.POGRIRData.IRAmount]
        }
      ];
      this.POGRIRAmountChartDataLabels = ['PO', 'GR', "IR"];
    }
  }

  ExportOrderDetail(type) {
    this.blocked = true;

    this.dashboardservice.GetOrderDetailExport(this.SearchData, type).subscribe(res => {
      this.blocked = false;

      this.exportService.exportAsExcelFile(res, 'result');
    })
  }

  SalesExport() {
    this.blocked = true;

    this.dashboardservice.GetSalesExport(this.SearchData).subscribe(res => {
      this.blocked = false;

      this.exportService.exportAsExcelFile(res, 'result');
    })
  }
  CatelogueItemExport() {

    if (this.warehouse.Cityid > 0 && this.warehouse.WareHouseId > 0) {
      this.blocked = true;
      this.dashboardservice.CatelogueItemExport(this.warehouse.Cityid, this.warehouse.WareHouseId).subscribe(res => {
        this.blocked = false;
        this.exportService.exportAsExcelFile(res, 'ItemExport');
      })
    }


  }
  CatalogCFRExport() {
    if (this.warehouse.Cityid > 0 && this.warehouse.WareHouseId > 0) {
      this.dashboardservice.CatalogCFRExport(this.warehouse.Cityid, this.warehouse.WareHouseId).subscribe(res => {
        this.blocked = false;
        this.exportService.exportAsExcelFile(res, 'CFRExport');
      })
    }

  }


  POFillRateExport() {
    this.blocked = true;

    this.dashboardservice.GetPOFillRateExport(this.SearchData).subscribe(res => {
      this.blocked = false;

      this.exportService.exportAsExcelFile(res, 'result');
    })
  }
  OrderFillRateExport() {
    this.blocked = true;

    this.dashboardservice.GetOrderFillRateExport(this.SearchData).subscribe(res => {
      this.blocked = false;

      this.exportService.exportAsExcelFile(res, 'result');
    })
  }
  // StockDetailExport(warehouse){
  //   if(warehouse==undefined||warehouse==""){
  //     alert("Select Warehouse")
  //     return;
  //   }
  //   this.dashboardservice.StockDetailExport(warehouse.WareHouseId).subscribe(result=>{
  //     this.exportService.exportAsExcelFile(result, 'StockDetail');
  //   })
  // }
  GetMargin() {
    let cityids = [];
    for (var i in this.selectedCities) {
      cityids.push(this.selectedCities[i].Cityid)
    }

    if (cityids.length > 0 && this.subcateid > 0) {
      this.SearchData.CityIds = cityids;

      this.BrandEarnData.StartDate = this.SearchData.FromDate;
      this.BrandEarnData.EndDate = this.SearchData.ToDate;
      this.BrandEarnData.SubCatId = this.SearchData.SubCatId;
      this.BrandEarnData.CityIds = this.SearchData.CityIds;
      this.blocked = true;
      this.LedgerList = null;
      this.dashboardservice.GetBrandLedger(this.BrandEarnData).subscribe((x: any) => {
        console.log(x)
        this.blocked = false;
        this.LedgerList = x;
      }, error => {
        this.blocked = false;

        alert('Something went wrong ');
      });
    }

  }
  // getTotal(arr) {
  //   let total = 0;
  //   for (let data of arr) {
  //     total += data.MarginPercent;
  //   }
  //   return total
  // }
}


