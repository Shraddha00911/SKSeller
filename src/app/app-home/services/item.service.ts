import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiBaseUrl  ;

  }
  uploadImage(ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SellerAppHome/UploadImageAppHome',ImageUrl);
  }
}
