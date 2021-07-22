import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiURL: string;
  User:any;
  comment : string;         
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiBaseUrl;
 
   }
  getHistory(entity , id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History?entityName='+entity + '&&entityId='+id);
  }

  getPeopleHistory(id):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Peoples/History?PeopleId='+id);
  }
}
