import {
  Component,
  OnInit,
  Input,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  editMode: boolean = false;
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      id: [this.data.id ? this.data.id : uuidv4(), Validators.required],
      name: [this.data.name ? this.data.name : '', Validators.required],
      contact: [
        this.data.contact ? this.data.contact : '',
        Validators.required,
      ],
      email: [
        this.data.email ? this.data.email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit() {
    const dataFromLS: any = localStorage.getItem('contactList');
    let submitData: any[] = JSON.parse(dataFromLS) || [];
    if (this.data.edit) {
      const index = submitData.findIndex((item) => item.id === this.data.id); //finding the user's index to edit
      if (index !== -1) {
        submitData[index] = this.contactForm.value; // updating the value
      }
      localStorage.setItem('contactList', JSON.stringify(submitData));
      this._snackBar.open('User updated', '', {
        duration: 2000,
      });
    } else {
      submitData.push(this.contactForm.value); //pushing data
      localStorage.setItem('contactList', JSON.stringify(submitData)); //setting new user in localstorage
      this._snackBar.open('New user added', '', {
        duration: 2000,
      });
    }
  }
}
