import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TableData, Permission, Role, PermissionResponse, PermissionType, TableRow } from '../types';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<PermissionResponse[]>;
  @Output() changedData: EventEmitter<Permission[]> = new EventEmitter();

  public tableData$: Subject<TableData> = new Subject();
  private subscriptions$: Subscription = new Subscription();
  public tableRowModel: { [key: string]: { [permission: string]: PermissionType } };
  constructor() { }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.data$.subscribe(res => {
        const usersInfo = res.map(r => ({
          name: r.name,
          permissions: this.sortPermissions(r.permissions)
        }));
        // FIXME: it must take list of permissions from api;
        const headers = this.getHeaders(usersInfo[0].permissions);
        const rows = usersInfo.map(user => this.createTableRow(user.permissions, user.name));
        this.tableData$.next({ headers, rows });
        this.createTableModel(usersInfo);
        console.warn('TableInfo = ', { headers, rows });
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  createTableRow(info: Permission[], user: string): TableRow {
    const row = info.reduce((acc, i) => ({
      ...acc,
      user,
      [i.name]: i.status.value,
      options: i.status.options
    }), {});
    return row;
  }
  getHeaders(info: Permission[]): string[] {
    return ['user', ...info.map(i => i.name)];
  }
  sortPermissions(coll: Permission[]): Permission[] {
    return [...coll].sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
  }

  createTableModel(data: PermissionResponse[]): void {
    this.tableRowModel = data.reduce((acc, res) => {
      const { name, permissions } = res;
      const mapping = permissions.reduce((iAcc, p) => ({ ...iAcc, [p.name]: p.status.value }), {});
      return { ...acc, [name]: mapping };
    }, {});
    console.log('TableModel = ', this.tableRowModel);
  }
}
