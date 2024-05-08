import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    // this.openDialog();
  }

  title = 'crud-app';

  openDialog = () => {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { edit: false },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  };
}
