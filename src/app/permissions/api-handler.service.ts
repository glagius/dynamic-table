import { Injectable } from '@angular/core';
import { Permission, PermissionType, Role, PermissionResponse } from './types';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { switchMap, delay, tap } from 'rxjs/operators';

const permissionOtions = [
  {
    name: 'fetchPOSData',
    data: [
      {
        status: 'VIEW'
      },
      {
        status: 'EDIT'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'setScreens',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'roles',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'sdPermissions',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'lhPermissions',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'notifyUsers',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  },
  {
    name: 'sandDollarsLog',
    data: [
      {
        status: 'EDIT'
      },
      {
        status: 'VIEW'
      },
      {
        status: 'HIDDEN'
      },
      {
        status: 'DISABLED'
      }
    ]
  }
];

const users = [
  {
    name: 'Gleb',
    userId: 1,
    role: Role.ADMIN,
  },
  {
    name: 'Rol',
    userId: 2,
    role: Role.USER,
  },
  {
    name: 'Ella',
    userId: 3,
    role: Role.USER,
  },
  {
    name: 'Victory',
    userId: 4,
    role: Role.GUEST,
  },
  {
    name: 'Stas',
    userId: 5,
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
  constructor() { }

  private user$: BehaviorSubject<PermissionResponse> = new BehaviorSubject(null);
  private users$: BehaviorSubject<PermissionResponse[]> = new BehaviorSubject([]);
  public permissionResponse$: BehaviorSubject<PermissionResponse[]> = new BehaviorSubject(null);

  setUser(user: PermissionResponse): void {
    this.user$.next(user);
  }
  getUser(): Subject<PermissionResponse> {
    return this.user$;
  }
  getUsers(): Readonly<BehaviorSubject<PermissionResponse[]>> {
    return this.users$;
  }
  getPermissions(): void {
    const fakeResponse: PermissionResponse[] = users.map(user => ({
      name: user.name,
      userId: user.userId,
      permissions: createPermissions(user.role)
    }));
    this.permissionResponse$.next(fakeResponse);
    this.users$.next(fakeResponse);
    this.user$.next(fakeResponse[0]);
  }
  getPermissionOptions(): any {
    return permissionOtions.reduce((acc, permission) => {
      const { name, data } = permission;
      const options = data.map(option => option.status);
      return { ...acc, [name]: options };
    }, {});
  }
  // setPermissions(permissions: Permission[]): void {
  //   this.permissionResponse$.next(permissions);
  // }
}
