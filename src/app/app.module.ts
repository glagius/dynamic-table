import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PermissionsModule } from './permissions/permissions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { LhpermissionsComponent } from './lhpermissions/lhpermissions.component';
import { SdpermissionsComponent } from './sdpermissions/sdpermissions.component';
import { PermissionAccessGuard } from './permission-access.guard';

const routes: Routes = [
  {
    path: 'roles', component: RolesComponent, canActivate: [PermissionAccessGuard]
  },
  {
    path: 'lhpermissions', component: LhpermissionsComponent, canActivate: [PermissionAccessGuard]
  },
  {
    path: 'sdpermissions', component: SdpermissionsComponent, canActivate: [PermissionAccessGuard]
  },
  {
    path: '**', component: AppComponent,
  }
];

const MaterilModules = [
  MatRadioModule,
];
@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    LhpermissionsComponent,
    SdpermissionsComponent
  ],
  imports: [
    ...MaterilModules,
    BrowserModule,
    PermissionsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
