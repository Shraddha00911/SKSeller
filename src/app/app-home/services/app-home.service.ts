import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppHomeService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }

  getSectionsByWarehouseId(data) {
    debugger;
    return this.http.get(this.apiURL + '/api/SellerAppHome/GetSellerAppHome?appType=' + data.AppType + '&wId=' + data.WarehouseId);
  }

  // getBaseCategoryByRedirectionType() {
  //   return this.http.get(this.apiURL + '/api/BaseCategory/activeBase');
  // }

  // getCategoriesByRedirectionType() {
  //   return this.http.get(this.apiURL + '/api/Category/activeCat');
  // }

  getBrandByRedirectionType() {
    return this.http.get(this.apiURL + '/api/SellerAppHome/ActiveSubSub');
  }

  saveCompleteAppHome(appHomeSectionsList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SellerAppHome/AddCompleteAppHome', appHomeSectionsList);
  }

  uploadImage(fileImg) {
    let res = this.http.post(this.apiURL + '/api/imageupload/HomeSectionImages', fileImg);
    return res;
  }

  saveSection(data): Observable<any> {
    debugger;
    return this.http.post<any>(this.apiURL + '/api/SellerAppHome/AddSection', data)
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      )
  }





  deleteSection(SectionID): Observable<any> {

    return this.http.delete<any>(this.apiURL + '/api/SellerAppHome/DeleteSection?SectionID=' + SectionID);
  }

  GetItemM(WarehouseId): Observable<any> {
    let warehouseId = Number(WarehouseId);
    return this.http.get<any>(this.apiURL + '/api/SellerAppHome/GetWarehouseItemForAppHome?WarehouseId=' + warehouseId);
  }

  getMOQByItemId(itemId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SellerAppHome/GetItemMOQ?ItemId=' + itemId);
  }


  deleteAppHome(AppHomeList): Observable<any> {

    return this.http.post(this.apiURL + '/api/SellerAppHome/DeleteAppHome/', AppHomeList);
  }


  publishCompleteAppHome(appHomeSectionsList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SellerAppHome/PublishAppHome', appHomeSectionsList);
  }

  cloneAppHome(cloneObject) {

    let res = this.http.post(this.apiURL + '/api/SellerAppHome/CloneAppHome/', cloneObject);
    return res;
  }


}
