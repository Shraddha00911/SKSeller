import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemschemeService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl;
  }


UploadExcel(formData: FormData) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  const httpOptions = { headers: headers };
  return this.http.post(this.apiURL + '/UploadItemSchemExcel', formData, httpOptions)
}

getUploadedItemScheme(filterModel): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetUploadedItemScheme?' + 'CityId=' + filterModel.CityId +
    '&SubsubCategoryid=' + filterModel.SubsubCategoryid + '&skip=' + filterModel.First + '&take=' + filterModel.Last
  );
}
getUploadedItemSchemeById(Id): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/ItemSchemeUploadedMasterById/' + Id);
}


getItemSchemeMaster(filterModel): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetItemSchemeMaster?' + 'CityId=' + filterModel.CityId +
    '&SubsubCategoryid=' + filterModel.SubsubCategoryid + '&skip=' + filterModel.First + '&take=' + filterModel.Last
  );
}

getItemSchemeMasterById(Id): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetItemSchemeMasterById/' + Id);
}

PostApproveItemSchemMaster(Data): Observable<any> {

  return this.http.put<any>(this.apiURL + '/api/ItemSchemeMaster/ApproveItemSchemMaster', Data);
}
DeActivateSchemeDetail(MasterId,DetailId): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateSchemeDetail?MasterId=' + MasterId  + '&DetailId=' + DetailId);
}
DeActivateSchemeMaster(MasterId): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateSchemeMaster?Id=' + MasterId);
}

UpdateForReErrorChecking(MasterId): Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/UpdateForReErrorChecking?MasterId=' + MasterId);
}


DeActivateFreebiesByDetailId(MasterId,data): Observable<any> {

  return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateFreebiesDetailId?MasterId=' + MasterId + '&DetailId=' + data.ItemSchemeDetailId);
}

}