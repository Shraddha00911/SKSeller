import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }
  GetBrandLedger(object) {
 
    return this.http.post<any>(this.apiURL + '/api/SellerLedger/Brand', object);
  }

  GetExportWarehouseLedger(object) {
 
    return this.http.post<any>(this.apiURL + '/api/SellerLedger/Export', object);
  }
}


