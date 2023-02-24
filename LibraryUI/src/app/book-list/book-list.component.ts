import { Component } from '@angular/core';
import { Client } from '../client.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers:  [ Client ]
})
export class BookListComponent {

}
