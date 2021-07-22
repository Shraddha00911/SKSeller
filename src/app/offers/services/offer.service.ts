import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }

  CreateOffer(addoffer) {
    return this.http.post<any>(this.apiURL + '/api/SelleOffer/CreateOffer', addoffer);
  }

  getOfferMaster(filterModel): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SelleOffer/Get?' + 'CityId=' + filterModel.CityId +
       '&skip=' + filterModel.First + '&take=' + filterModel.Last
    );
  }
  GetFirstHubItem(cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SelleOffer/FirstHubItem?CityId=' +cityid);
   
  }
  ActiveOrDeactiveOffer(OfferId,IsActive): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SelleOffer/ActiveOrDeactiveOffer?OfferId=' +OfferId +"&IsActive="+IsActive);
   
  }
}



