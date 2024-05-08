import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  private refreshTableSubject = new BehaviorSubject<void>(undefined);
  refreshTable$ = this.refreshTableSubject.asObservable();

  constructor() {}

  triggerRefreshTable() {
    this.refreshTableSubject.next();
  }
}
