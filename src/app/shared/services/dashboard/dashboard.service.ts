import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Subject, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;

  }

  refreshNavigationPage = new BehaviorSubject("");
  refreshNavigationPageFun(status){
    this.refreshNavigationPage.next(status);
  }

  GetCatelogueItemWithCFR(cityid, WarehouseId) {
    return this.http.get<any>(this.apiURL + '/api/Seller/GetCatelogueItemWithCFR/' + cityid + '/' + WarehouseId);
  }

  GetSellerSales(object) {

    return this.http.post<any>(this.apiURL + '/api/Seller/GetSellerSales', object);
  }

  GetDashboardPoStatusCount(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/DashboardPoStatusCount', object);
  }

  GetDashboardOrderStatusData(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/DashboardOrderStatusData', object);

  }

  GetDashboardOrderFillRate(object) {

    return this.http.post<any>(this.apiURL + '/api/Seller/DashboardOrderFillRate', object);

  }

  GetPOFillRate(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/POFillRate', object);
  }
  GetPOAvgTAT(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/POAvgTAT', object);

  }
  GetDashboardOrderAvgTAT(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/DashboardOrderAvgTAT', object);

  }

  GetDashboardCurrentVsNetCurrent(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/DashboardCurrentVsNetCurrent', object);

  }
  GetPOGRIRCount(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/POGRIRCount', object);

  }
  GetPareto(object, type, itemnumber) {

    return this.http.post<any>(this.apiURL + '/api/Seller/Pareto/' + type + '/' + itemnumber, object);
  }
  GetOrderDetailExport(object, type) {

    return this.http.post<any>(this.apiURL + '/api/Seller/OrderDetailExport/' + type, object);
  }
  GetWarehouseByCityids(postdc) {

    return this.http.post<any>(this.apiURL + '/api/Seller/GetWarehouseByCityids/cityids', postdc);
  }

  CatalogCFRExport(cityid, WarehouseId) {
    return this.http.get<any>(this.apiURL + '/api/Seller/CatalogCFRExport/' + cityid + '/' + WarehouseId);
  }

  CatelogueItemExport(cityid, WarehouseId) {
    return this.http.get<any>(this.apiURL + '/api/Seller/CatelogueItemExport/' + cityid + '/' + WarehouseId);
  }


  GetSalesExport(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/SalesExport', object);
  }

  GetPOFillRateExport(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/POFillRateExport', object);
  }

  GetOrderFillRateExport(object) {
    return this.http.post<any>(this.apiURL + '/api/Seller/OrderFillRateExport', object);
  }
  StockDetailExport(warehouse){
    return this.http.get<any>(this.apiURL+'/api/SellerNetStockController?WarehouseId='+warehouse)
  }
  GetBrandLedger(object) {
    return this.http.post<any>(this.apiURL + '/api/SellerLedger/Brand', object);
  }
}


