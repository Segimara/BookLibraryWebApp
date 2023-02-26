import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateListService {

  private mySubject = new Subject<void>();

  constructor() { }
  
  notifyComponent() {
    this.mySubject.next();
  }
  
  getSubject() {
    return this.mySubject.asObservable();
  }
}