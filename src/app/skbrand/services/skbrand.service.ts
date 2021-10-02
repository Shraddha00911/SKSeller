import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SkbrandService {
  readonly rootUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  GetAllSubCatMapping(): Observable<any[]> {
    return this.http.get<any[]>(this.rootUrl + '/api/Seller/Mapping');
  }

  GetAllBrand(): Observable<any[]> {

    return this.http.get<any[]>(this.rootUrl + '/api/Seller/Brand');
  }

  

  GetAllCity(): Observable<any[]> {
    return this.http.get<any[]>(this.rootUrl + '/api/Warehouse/GetActiveWarehouseCity');
  }

  GetBusinessDashboardData(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyDashBoard', object);
  }
  GetBusinessDashboardGraphData(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyDashboardGraphData', object);
  }



}
