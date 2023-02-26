import { Component, Input, OnInit } from '@angular/core';
import { ClientService, BookList} from '../services/client.service';
import { UpdateListService } from '../services/UpdateList.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ClientService]
})
export class BookListComponent implements OnInit{
  bookList!: BookList;
  
  @Input() type!: string 
  constructor(private client: ClientService,
    private updateListService: UpdateListService)
  {

  }
  ngOnInit(): void {
    this.iniBooks();
    this.updateListService.getSubject().subscribe(() => {
      this.iniBooks()
    });
  }

  iniBooks() {
    switch(this.type)
    {
      case 'ALL':
      {
        this.client.booksGETAll("title").subscribe((data) => {
          this.bookList = data;
        });
        break;
      }
      case 'RECOMENDET':
      {
        this.client.recommended("horror").subscribe((data) => {
          this.bookList = data;
        });
        break;
      }
    }
  }

}
