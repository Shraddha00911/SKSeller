
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubcatmappingService {
  readonly rootUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  GetAllSubCatMapping(): Observable<any[]> {

    return this.http.get<any[]>(this.rootUrl + '/api/Seller/Mapping');
  }

  GetAllBrand(): Observable<any[]> {

    return this.http.get<any[]>(this.rootUrl + '/api/Seller/Brand');
  }


  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post(this.rootUrl + '/UploadSellerCfr', formData, httpOptions)
  }
 
}

