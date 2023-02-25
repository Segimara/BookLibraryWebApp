import { Component } from '@angular/core';

import { ClientService } from '../services/client.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ClientService]
})
export class BookListComponent {

}
