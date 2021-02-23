import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly rootUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  userAuthentication(userName, password ,usertype) {
    const formData = new FormData();
    var data = '';
      data = "grant_type=password&username=" + userName + "&password=" + password  + "&usertype=" + usertype;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
}

