import { Component, Input, OnInit } from '@angular/core';
import {BookLookupDto} from '../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookComponent } from '../view-book/view-book.component';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() book!: BookLookupDto;

  constructor(private dialog: MatDialog, private client: ClientService)
  {

  }
  ngOnInit(): void {
    
  }
  openDialog(id: number = 0) {
    const dialogRef = this.dialog.open(ViewBookComponent, {
      width: '70vw',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
