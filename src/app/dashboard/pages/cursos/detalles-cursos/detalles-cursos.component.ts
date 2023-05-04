import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../Componentes/models';
import { CursosService } from '../Componentes/services/cursos.service';
import { Inscripciones } from '../../inscripciones/componentes/models';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models';
import { InscripcionesService } from '../../inscripciones/componentes/services/cursos.service';

@Component({
  selector: 'app-detalles-cursos',
  templateUrl: './detalles-cursos.component.html',
  styleUrls: ['./detalles-cursos.component.scss']
})
export class DetallesCursosComponent {

  dataSource = new MatTableDataSource<Inscripciones>();

  displayedColumns: string[] = ['id', 'alumno', 'fecha_inicio', 'desuscribir']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {

    this.inscripcionesService.obtenerInscripciones()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones.filter(x => x.cursoId === parseInt(this.activatedRoute.snapshot.params['id']));
      })
  }

  desuscribirAlumno(alumnoForDelete: Alumno): void {
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== alumnoForDelete.id,
      );
    }
  }
}
