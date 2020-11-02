import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PermissionsModule } from './permissions/permissions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';

const MaterilModules = [
  MatRadioModule,
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...MaterilModules,
    BrowserModule,
    PermissionsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
