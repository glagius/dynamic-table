import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from './permissions/api-handler.service';
import { Role, PermissionResponse, Permission, PermissionType } from './permissions/types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private service: ApiHandlerService
  ) { }

  public user$ = this.service.getUser();
  public users$ = this.service.getUsers();
  public permissions$ = this.service.permissionResponse$;
  public permissionOptions;

  title = 'permissions-table';

  ngOnInit(): void {
    this.service.getPermissions();
    this.permissionOptions = this.service.getPermissionOptions();
  }
  toggleUser(user: PermissionResponse): void {
    this.service.setUser(user);
  }
  // TODO: create as a pipe
  checkPermissions(coll: Permission[]): Permission[] {
    // return coll.filter(p => p.status.value !== PermissionType.DISABLED);
    return coll;
  }
}
