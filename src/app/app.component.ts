import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from './_dialogs/contact-form/contact-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableDataService } from './_services/table-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private tableDataService: TableDataService
  ) {}
  ngOnInit(): void {
  }

  title = 'crud-app';

  openDialog = () => {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { edit: false },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.tableDataService.triggerRefreshTable();
    });
  };
}
