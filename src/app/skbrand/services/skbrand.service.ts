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

  //All start for cataglog module(D)
  GetCompanyCatelog(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyCatelog', object);
  }

  GetCompanyCatelogBrand(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyCatelogBrand', object);
  }

  GetCompanyCatelogBrandItem(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyCatelogBrandItem', object);
  }
  //All End for cataglog module(D)

  //All Start Sales API call(D)
  GetCompanySale(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanySale', object);
  }

  GetCompanySaleGraph(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanySaleGraph', object);
  }

  GetCompanyHeatMapData(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyHeatMapData', object);
  }

  GetBrandHeatMapData(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetBrandHeatMapData', object);
  }

  //All start Inventory API D
  GetCompanyInventoryGraph(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyInventoryGraph', object);
  }

  GetCompanyInventory(object) { 
    return this.http.post<any>(this.rootUrl + '/api/Seller/GetCompanyInventory', object);
  }
}
