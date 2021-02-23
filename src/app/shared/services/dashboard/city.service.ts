import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }
  GetAllCity(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/GetActiveWarehouseCity');
  }

  getWareHouseByCity(cityId): Observable<any> {
   
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetWarehouseCity?cityid=' + cityId);
  }
}


