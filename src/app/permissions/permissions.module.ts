import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialModules = [
  MatTableModule,
  MatSelectModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    ...MaterialModules,
    CommonModule
  ]
})
export class PermissionsModule { }
