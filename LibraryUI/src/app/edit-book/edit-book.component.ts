
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService, CreateUpdateBookCommand, ICreateUpdateBookCommand } from '../services/client.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  providers:  [ ClientService ]
})
export class EditBookComponent implements OnInit{
  isUpdate: boolean
  coverBase64!: string;
  book: CreateUpdateBookCommand = new CreateUpdateBookCommand();
  bookForm = this.formBuilder.group({
    id:[''],
    title:[''],
    cover:[''],
    content:[''],
    author:[''],
    genre:[''],
  })

  constructor(private httpClient: ClientService, private formBuilder: FormBuilder)
  {
    this.isUpdate = false;

  }

  ngOnInit(): void {
  }
  onFileSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverBase64 = reader.result?.toString() as string;
      };
      reader.readAsDataURL(file);
    }
  }
  addBook()
  {
    const formValue = this.bookForm.value;
    if (formValue.id == "")
     {
      formValue.id = undefined; 
     }
    this.book = CreateUpdateBookCommand.fromJS(formValue);
    this.book.cover = this.coverBase64;
    this.httpClient.booksPOST(this.book)
    console.log(this.book);
  }
  clearForm()
  {
    this.bookForm.reset();
  }
}