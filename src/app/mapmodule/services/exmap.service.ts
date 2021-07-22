import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }



  WarehouseGetByID():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
  }

  getExcutiveByWarehouse(warehouseId:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/ClusterStoreExecutive/GetExecutiveListOfStoretwo/' + warehouseId);
  }

  getExcutiveRoute(peopleId:any,date: string):Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/SalesApp/GetExecutiveRoute?peopleId='+peopleId+'&date='+date)
  }
  GetWarehouseByCityids(data) {
        return this.http.post<any>(this.apiURL + '/api/Seller/GetWarehouseByCityids/cityids', data);
  }



}