import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }
  getItemcity(cityid,name){
    return this.http.get<any>(this.apiURL + '/api/SellerEditPrice/CityItem?CityId='+cityid+'&keyword=' + name);
  }
  getItemDetail(ItemMultiMRPId,CityId,Number){
   
    return this.http.get<any>(this.apiURL + '/api/SellerEditPrice/ItemByMRPId?ItemMultiMrpId=' + ItemMultiMRPId+'&CityId='+CityId +'&Number='+Number);
  }
  postitemdetail(itemobject){
   
    return this.http.post<any>(this.apiURL + '/api/SellerEditPrice/UpdateCityItems',itemobject);
  }
}
