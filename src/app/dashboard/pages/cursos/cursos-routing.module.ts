import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { DetallesCursosComponent } from './detalles-cursos/detalles-cursos.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CursosComponent
      },
      {
        path: ':id',
        component: DetallesCursosComponent,
      }
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class AlumnosRoutingModule { }
