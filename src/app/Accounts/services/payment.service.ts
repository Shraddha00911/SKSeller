import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }
  GetSellerMonthlyChargeMaster(SubCatId, Month, Year) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/Payment/' + SubCatId + '/' + Month + '/' + Year);
  }
  GetSellerMonthlyChargeDetail(SubCatId, Month, Year, ChargeType) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/PaymentDetail/' + SubCatId + '/' + Month + '/' + Year + '/' + ChargeType);
  }
  GetExportSellerOPLineItems(SubCatId, Month, Year) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/ExportSellerOPLineItems/' + SubCatId + '/' + Month + '/' + Year);
  }
  GetExportDelChargeLineItems(SubCatId, Month, Year) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/ExportDelChargeLineItems/' + SubCatId + '/' + Month + '/' + Year);
  }
  GetActivetedLineItems(SubCatId, Month, Year) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/ActivetedLineItems/' + SubCatId + '/' + Month + '/' + Year);
  }
  GetSellerClosingLineItems(SubCatId, Month, Year) {
    return this.http.get<any>(this.apiURL + '/api/SellerLedger/SellerClosingLineItems/' + SubCatId + '/' + Month + '/' + Year);
  }
}



