import { Component, Input, OnInit } from '@angular/core';
import { ClientService, BookList} from '../services/client.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ClientService]
})
export class BookListComponent implements OnInit{
  bookList!: BookList;
  
  @Input() type!: string 
  constructor(private client: ClientService)
  {

  }
  ngOnInit(): void {
    this.iniBooks();
  }
  iniBooks() {
    switch(this.type)
    {
      case 'ALL':
      {
        this.client.booksGETAll("title").subscribe((data) => {
          this.bookList = data;
        });
        console.log("all");
        break;
      }
      case 'RECOMENDET':
      {
        this.client.recommended("horror").subscribe((data) => {
          this.bookList = data;
        });
        console.log("recomendet");
        break;
      }
    }
  }

}
