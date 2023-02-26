import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetailsVm, ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class FillFormService {

  private mySubject = new Subject<any>();

  constructor(private client: ClientService) { }

  notifyComponent(data: number) {
    this.client.booksGETById(data).subscribe((data) => {
      this.mySubject.next(data)
    });
  }
  notifyComponentNullObj() {
    this.mySubject.next(null);
  }
  getSubject() {
    return this.mySubject.asObservable();
  }

}
