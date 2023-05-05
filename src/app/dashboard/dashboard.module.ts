import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HoraComponent } from './hora/hora.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'


@NgModule({
  declarations: [
    DashboardComponent,
    HoraComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./pages/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
      }
    ])
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
