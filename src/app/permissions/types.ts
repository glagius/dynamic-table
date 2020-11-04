export interface Permission {
  name: string;
  status: {
    value: PermissionType,
    options: PermissionType[]
  };
}

export enum PermissionType {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  HIDDEN = 'HIDDEN',
  DISABLED = 'DISABLED',
}

/**
 * API response for User data
 */
export interface PermissionResponse {
  userId: number;
  name: string;
  permissions: Permission[];
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export interface TableRow {
  [key: string]: string | PermissionType[];
}
export interface TableData {
  headers: string[];
  rows: TableRow[];
}
