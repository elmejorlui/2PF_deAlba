import { Component, OnInit } from '@angular/core';
import { CursosService } from './Componentes/services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { Curso } from './Componentes/models/index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'acciones'];

  constructor(
    private router: Router,
    private activatesRoute: ActivatedRoute,
    private cursosService: CursosService,
    private dialog: MatDialog,
  ) {
  }

  abrirDetallesCurso(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatesRoute
    })

  }

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  crearCurso(): void {
    const dialog = this.dialog.open(AbmCursosComponent);

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.cursosService.crearCurso(formValue)
        }
      });
  }

  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCursosComponent, {
      data: {
        curso,
      }
    })

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.cursosService.editarCurso(curso.id, formValue);
        }
      })
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('Esta Seguro?'))
      this.cursosService.eliminarCurso(curso.id);
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }
}
