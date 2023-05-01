import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from '../pages/alumnos/alumnos.module';
import { SharedModule } from '../shared/shared.module';
import { FormularioModule } from '../pages/formulario/formulario.module';
import { HoraComponent } from './hora/hora.component';
import { CursosModule } from '../pages/cursos/cursos.module';
import { InscripcionesModule } from '../pages/inscripciones/inscripciones.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'


@NgModule({
  declarations: [
    DashboardComponent,
    HoraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AlumnosModule,
    SharedModule,
    FormularioModule,
    CursosModule,
    InscripcionesModule,
    MatListModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
