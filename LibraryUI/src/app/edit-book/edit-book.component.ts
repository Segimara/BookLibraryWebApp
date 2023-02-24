import { Component } from '@angular/core';
import { Client } from '../client.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  providers:  [ Client ]
})
export class EditBookComponent {

}
