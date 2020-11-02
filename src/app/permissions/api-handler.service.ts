import { Injectable } from '@angular/core';
import { Permission, PermissionType, Role, PermissionResponse } from './types';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { switchMap, delay, tap } from 'rxjs/operators';

// const permissionTypes: PermissionType = {
//   edit: PermissionType.EDIT,
//   view: PermissionType.VIEW,
//   hidden: PermissionType.HIDDEN,
//   disabled: PermissionType.DISABLED
// };
const users = [
  {
    name: 'Gleb',
    role: Role.ADMIN,
  },
  {
    name: 'Rol',
    role: Role.USER,
  },
  {
    name: 'Ella',
    role: Role.USER,
  },
  {
    name: 'Victory',
    role: Role.GUEST,
  },
  {
    name: 'Stas',
    role: Role.GUEST,
  }
];

const permissionNames = [
  'fetchPOSData', 'setScreens', 'roles', 'sdPermissions', 'lhPermissions', 'notifyUsers', 'sandDollarsLog'
];

const createPermissions = (role: Role): Permission[] => {
  const options = [
    PermissionType.EDIT,
    PermissionType.VIEW,
    PermissionType.HIDDEN,
    PermissionType.DISABLED
  ];
  switch (role) {
    case Role.ADMIN: {
      return permissionNames.map(name => ({
        name,
        status: {
          value: PermissionType.EDIT,
          options
        }
      }));
    }
    case Role.USER: {
      return permissionNames.map((name, index) => ({
        name,
        status: {
          value: index % 3 === 0 ? PermissionType.EDIT : PermissionType.VIEW,
          options
        }
      }));
    }
    case Role.GUEST: {
      return permissionNames.map((name, index) => ({
        name,
        status: {
          value: index % 3 === 0 ? PermissionType.VIEW : PermissionType.DISABLED,
          options
        }
      }));
    }
    default:
      throw new Error(`Unexpected role: ${role}`);
  }
};


@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  private user$: BehaviorSubject<Role> = new BehaviorSubject(Role.ADMIN);
  public permissionResponse$: Subject<PermissionResponse[]> = new Subject();
  constructor() { }

  setRole(role: Role): void {
    this.user$.next(role);
  }
  getRole(): Readonly<BehaviorSubject<Role>> {
    return this.user$;
  }

  getPermissions(): void {
    this.user$
      .pipe(
        switchMap(role => {
          const fakeResponse: PermissionResponse[] = users.map(user => ({
            name: user.name,
            permissions: createPermissions(user.role)
          }));
          return of(fakeResponse);
        }),
        delay(1000),
      )
      .subscribe(coll => this.permissionResponse$.next(coll));
  }

  // setPermissions(permissions: Permission[]): void {
  //   this.permissionResponse$.next(permissions);
  // }
}
