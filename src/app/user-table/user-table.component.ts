import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  displayedColumns: string[] = [
    'position',
    'name',
    'contact',
    'email',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const dataFromLocalStorage: string | any =
      localStorage.getItem('contactList') || [];
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      this.dataSource.data = parsedData;
    }
  }

  openDialog(elem: any) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: {
        edit: true,
        id: elem.id,
        name: elem.name,
        contact: elem.contact,
        email: elem.email,
      },
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Refresh table after form submission
      this.loadLocalStorageData();
    });
  }

  deleteContact(idToDelete: string) {
    const dataFromLS: any = localStorage.getItem('contactList');
    let submitData: any[] = JSON.parse(dataFromLS) || [];
    // Showing alert and asking for confirmation
    const confirmation = confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmation) {
      // Deleting the contact if user confirms
      submitData = submitData.filter((item) => item.id !== idToDelete);
      localStorage.setItem('contactList', JSON.stringify(submitData));

      //updating the table
      this.loadLocalStorageData();

      //snackbar
      this._snackBar.open('User deleted', '', {
        duration: 2000,
      });
    }
  }
}
