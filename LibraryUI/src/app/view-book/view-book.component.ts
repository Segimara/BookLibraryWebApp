import { Component } from '@angular/core';
import { Client } from '../client.service';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
  providers:  [ Client ]
})
export class ViewBookComponent {

}
