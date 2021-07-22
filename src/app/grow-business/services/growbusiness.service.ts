import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FlashDealRequest,AppBannerRequestDC,
    NotificationRequest,MurliRequest,BrandStoreRequest } from 'src/app/grow-business/interfaces/growbusiness'
@Injectable({
  providedIn: 'root'
})
export class GrowBusinessService {
  apiURL: string;

          
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiBaseUrl;
 
   }

   postMurliReq(murliData){  
    return this.http.post<any>(this.apiURL + '/api/MurliReq/PostMurliReq',murliData);
  }
 
  postFlashDealReq(flashDealReqData){  
    return this.http.post<any>(this.apiURL + '/api/FlashDealReq/PostFlashDealReq',flashDealReqData);
  }

  postAppBannerReq(appBannerReqData){  
    return this.http.post<any>(this.apiURL + '/api/AppBannerReq/PostAppBannerReq',appBannerReqData);
  }

  postBrandStoreReq(brandStoreReq){  
    return this.http.post<any>(this.apiURL + '/api/BrandStoreReq/PostBrandStoreReq',brandStoreReq);
  }

  postNotificationReq(notificationReq){  
    return this.http.post<any>(this.apiURL + '/api/NotificationReq/PostNotificationReq',notificationReq);
  }

  GetAppBannerRequestList(skip:number, take:number){
    return this.http.get<any>(this.apiURL + '/api/AppBannerReq/GetAppBannerRequestList/?skip='+skip+'&take='+take);

  }

  GetBrandStoreRequestList(skip:number, take:number){
    return this.http.get<any>(this.apiURL + '/api/BrandStoreReq/GetBrandStoreRequestList/?skip='+skip+'&take='+take);

  }

  GetFlashDealRequestList(skip:number, take:number){
    return this.http.get<any>(this.apiURL + '/api/FlashDealReq/GetFlashDealRequestList/?skip='+skip+'&take='+take);

  }

  
  GetNotificationRequestList(skip:number, take:number){
    return this.http.get<any>(this.apiURL + '/api/NotificationReq/GetNotificationRequestList?skip='+skip+'&take='+take);

  }

  GetMurliRequestList(skip:number, take:number){
    return this.http.get<any>(this.apiURL + '/api/MurliReq/GetMurliRequestList?skip='+skip+'&take='+take);

  }

  uploadImage(ImageUrl): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/MurliReq/ImageUpload', ImageUrl);
  }
  
  getGrowBusinessList(data){
    return this.http.post<any>(this.apiURL + '/api/GrowBusinessHistory/GetBussinessRequestList',data);

  }

  getCategoryList(SubCatId){
    return this.http.get<any>(this.apiURL + '/api/BrandStoreReq/GetCategory?SubCatId='+SubCatId);

  }


  getGrowBusinessDetails(RequestType:number,Id:number){
    return this.http.get<any>(this.apiURL + '/api/GrowBusinessHistory/GetBussinessDetail?RequestType='+RequestType+'&Id='+Id);

  }

  // exportAsExcelFile(data){
  //   return this.http.post<any>(this.apiURL + '/api/GrowBusinessHistory/ExportBussinessRequest',data);

  // }

  exportAsExcelFile(obj){
    return this.http.post<any>(this.apiURL + '/api/GrowBusinessHistory/ExportBussinessRequest',obj);

  }

  calcleReq(RequestType:number,Id:number){
    return this.http.get<any>(this.apiURL + '/api/GrowBusinessHistory/CancleRequest?RequestType='+RequestType+'&Id='+Id);

  }
  DeleteItemRow(Id:number){
    return this.http.get<any>(this.apiURL + '/api/GrowBusinessHistory/DeleteItemRow?Id='+Id);

  }
 
}
