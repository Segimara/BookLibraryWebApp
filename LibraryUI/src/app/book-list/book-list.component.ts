import { Component, Input, OnInit } from '@angular/core';
import { ClientService, BookList} from '../services/client.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ClientService]
})
export class BookListComponent implements OnInit{
  @Input() bookList!: BookList;
  
  constructor()
  {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
