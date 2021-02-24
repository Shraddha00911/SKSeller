import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;

  }
  GetCatelogueItemWithCFR(cityid, WarehouseId) {
    return this.http.get<any>(this.apiURL + '/api/Seller/GetCatelogueItemWithCFR/' + cityid + '/' + WarehouseId);
  }

  GetSellerSales(cityid: any) {
    return this.http.get<any>(this.apiURL + '/api/Seller/GetSellerSales/' + cityid);
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
  
    return this.http.post<any>(this.apiURL + '/api/Seller/Pareto/'+type+'/'+itemnumber, object);
  }
 GetOrderDetailExport(object,type){
   debugger;
  return this.http.post<any>(this.apiURL + '/api/Seller/OrderDetailExport/' + type,  object);
 }

}


