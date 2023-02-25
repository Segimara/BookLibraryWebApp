import { Component, Input, OnInit } from '@angular/core';
import {BookLookupDto} from '../services/client.service';
@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() books!: BookLookupDto;

  constructor()
  {

  }
  ngOnInit(): void {
    
  }

}
