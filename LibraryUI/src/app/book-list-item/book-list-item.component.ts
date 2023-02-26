import { Component, Input, OnInit } from '@angular/core';
import { BookLookupDto } from '../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookComponent } from '../view-book/view-book.component';
import { ClientService } from '../services/client.service';
import { FillFormService } from '../services/FillForm.service';
import { UpdateListService } from '../services/UpdateList.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() book!: BookLookupDto;

  constructor(private dialog: MatDialog, private client: ClientService,
    private fillFormServive: FillFormService) {

  }
  ngOnInit(): void {
    
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(ViewBookComponent, {
      width: '70vw',
      maxHeight: '80vh',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
  fillForm(id: number) {
    this.fillFormServive.notifyComponent(id);
  }
}
