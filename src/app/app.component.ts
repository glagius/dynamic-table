import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from './permissions/api-handler.service';
import { Role } from './permissions/types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private service: ApiHandlerService
  ) { }

  public role$ = this.service.getRole();
  public roles = [Role.ADMIN, Role.USER, Role.GUEST];
  public permissions$ = this.service.permissionResponse$;

  title = 'permissions-table';

  ngOnInit(): void {
    this.service.getPermissions();
  }
  toggleRole(role: Role): void {
    this.service.setRole(role);
  }
}
