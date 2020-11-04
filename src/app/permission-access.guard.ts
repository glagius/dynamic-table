import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiHandlerService } from './permissions/api-handler.service';
import { PermissionResponse, PermissionType, Permission } from './permissions/types';

const getPermissionTypeForRoute = (permissions: Permission[], route: string) => {
  const permissionNameMapping = {
    roles: 'roles',
    sdpermissions: 'sdPermissions',
    lhpermissions: 'lhPermissions'
  };
  const target = permissions.find(p => p.name === permissionNameMapping[route]);
  return target.status.value;
};

@Injectable({
  providedIn: 'root'
})
export class PermissionAccessGuard implements CanActivate {
  private user: PermissionResponse;

  constructor(private service: ApiHandlerService) {
    this.service.getUser().subscribe(user => this.user = user);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pageName = next.url[0].path;
    console.log('PageName = ', pageName);
    const status = getPermissionTypeForRoute(this.user.permissions, pageName);
    switch (pageName) {
      case 'roles':
      case 'sdpermissions':
      case 'lhpermissions': {
        return status !== PermissionType.DISABLED;
      }
      default:
        return true;
    }
  }

}
