import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { CursosComponent } from './cursos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetallesCursosComponent } from './detalles-cursos/detalles-cursos.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CursosComponent,
    AbmCursosComponent,
    DetallesCursosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    DirectivesModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ], exports: [
    CursosComponent
  ]

})
export class CursosModule { }
