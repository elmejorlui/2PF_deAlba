import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { DetallesAlumnosComponent } from './pages/alumnos/detalles-alumnos/detalles-alumnos.component';
import { DetallesCursosComponent } from './pages/cursos/detalles-cursos/detalles-cursos/detalles-cursos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'estudiantes',
        children: [
          {
            path: '',
            component: AlumnosComponent,
          },
          {
            path: ':id',
            component: DetallesAlumnosComponent,
          },
        ],
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: CursosComponent,
          },
          {
            path: ':id',
            component: DetallesCursosComponent
          }
        ]
      },
      {
        path: 'inscripciones',
        component: InscripcionesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
