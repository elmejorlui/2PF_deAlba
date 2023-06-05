import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripciones } from '../../inscripciones/componentes/models';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models';
import { InscripcionesService } from '../../inscripciones/componentes/services/inscripciones.service';

@Component({
  selector: 'app-detalles-cursos',
  templateUrl: './detalles-cursos.component.html',
  styleUrls: ['./detalles-cursos.component.scss']
})
export class DetallesCursosComponent {

  dataSource = new MatTableDataSource<Inscripciones>();

  displayedColumns: string[] = ['id', 'alumno', 'fecha_inscripcion', 'desuscribir']

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

  desuscribirAlumno(inscripcionId: number): void {
    if (confirm('Esta seguro de borrar?')) {
      this.inscripcionesService
        .eliminarInscripcion(inscripcionId)
        .subscribe(() => {
          const updatedData = this.dataSource.data.filter(
            (inscripcion) => inscripcion.id !== inscripcionId
          );
          this.dataSource.data = updatedData;
        });
    }
  }
}
