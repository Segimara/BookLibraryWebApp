import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetailsVm, ClientService } from '../services/client.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
  providers:  [ ClientService ]
})
export class ViewBookComponent implements OnInit {
  book!: BookDetailsVm;
  constructor(private dialogRef: MatDialogRef<ViewBookComponent>,
    private client: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
    this.client.booksGETById(this.data).subscribe((data) =>
      {
        this.book = data;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
