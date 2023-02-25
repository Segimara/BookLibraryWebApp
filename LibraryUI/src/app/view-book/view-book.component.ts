import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
  providers:  [ ClientService ]
})
export class ViewBookComponent {

}
