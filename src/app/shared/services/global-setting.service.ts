import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingService {
  isChangeSubCategory: Subject<void> = new Subject<void>();
  constructor() { }

  changeSubCategory() {
    this.isChangeSubCategory.next();
  }
}
