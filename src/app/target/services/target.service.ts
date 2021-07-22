import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }

  GetSalesTargetList(Data) {
    return this.http.post<any>(this.apiURL + '/api/SalesTarget/GetSalesTargetList', Data);
  }
  postTargetData(Data) {
    return this.http.post<any>(this.apiURL + '/api/SalesTarget/AddUpdateBaseQty', Data);
  }
  GetStoreList() {
    return this.http.get<any>(this.apiURL + '/api/SalesTarget/GetStoreList');
  }
  GetStoreMrpItemList(SubCatId) {
    return this.http.get<any>(this.apiURL + '/api/SalesTarget/GetStoreMrpItemList?SubCatId=' + SubCatId);
  }
  SalesTargetExport(Data) {
    return this.http.post<any>(this.apiURL + '/api/SalesTarget/SalesTargetExport', Data);
  }
  EdtBaseQty(Data) {
    return this.http.post<any>(this.apiURL + '/api/SalesTarget/EditBaseQty', Data);
  }
  DeleteBaseQty(Data) {
    return this.http.post<any>(this.apiURL + '/api/SalesTarget/DeleteBaseQty', Data);
  }
}
