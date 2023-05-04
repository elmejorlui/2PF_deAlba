import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './componentes/services/alumnos.service';
import { Alumno } from '../alumnos/componentes/models/index';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  dataSource = new MatTableDataSource<Alumno>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'correo', 'pais', 'fecha_registro', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private router: Router,
    private activatesRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {

    this.alumnosService.obtenerAlumnos()
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos;
      })
  }

  irAlDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatesRoute,
    });
  }

  abrirABMalumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [...this.dataSource.data,
        {
          ...valor,
          fecha_registro: new Date(),
          id: this.dataSource.data.length + 1,
        }
        ];
      }
    })
  }

  deleteAlumno(alumnoForDelete: Alumno): void {
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== alumnoForDelete.id,
      );
    }
  }

  actualizarAlumno(alumnoParaEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar
      }
    })
    dialog.afterClosed().subscribe((dataDelAlumnoEditado) => {
      if (dataDelAlumnoEditado) {
        this.dataSource.data = this.dataSource.data.map(
          (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
            ? ({ ...alumnoActual, ...dataDelAlumnoEditado })
            : alumnoActual,
        );
      }
    })
  }

}
