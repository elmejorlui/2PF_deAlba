import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from './componentes/models';
import { InscripcionesService } from './componentes/services/cursos.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlumnosService } from '../alumnos/componentes/services/alumnos.service';
import { CursosService } from '../cursos/Componentes/services/cursos.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { Curso } from '../cursos/Componentes/models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  dataSource = new MatTableDataSource<Inscripciones>();
  authUser$: Observable<Usuario | null>;
  role: string | null | undefined;
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fecha_inicio', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }

  abrirAbmInscripciones(): void {
    const dialogRef = this.matDialog.open(AbmInscripcionesComponent);

    dialogRef.afterClosed().subscribe((nuevaInscripcion) => {
      if (nuevaInscripcion) {
        this.inscripcionesService.guardarInscripcion(nuevaInscripcion).subscribe((inscripcionGuardada) => {
          this.dataSource.data = [...this.dataSource.data, inscripcionGuardada];
        });
      }
    });
  }

  ngOnInit(): void {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.authUser$.subscribe((user) => {
      this.role = user?.role;
    });
    this.inscripcionesService.obtenerInscripciones().subscribe((inscripciones) => {
      this.dataSource.data = inscripciones;
      for (const inscripcion of inscripciones) {
        this.alumnosService.obtenerAlumnoPorId(inscripcion.alumnoId).subscribe((alumno) => {
          inscripcion.alumno = alumno;
        });
        this.cursosService.obtenerCursos().subscribe((cursos: Curso[]) => {
          const cursoEncontrado = cursos.find(curso => curso.id === inscripcion.cursoId);
          if (cursoEncontrado) {
            inscripcion.curso = cursoEncontrado;
          }
        });
      }
    });
  }

  eliminarInscripcion(inscripcionId: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      return;
    }

    this.inscripcionesService.eliminarInscripcion(inscripcionId).subscribe(() => {
      const updatedData = this.dataSource.data.filter((inscripcion) => inscripcion.id !== inscripcionId);
      this.dataSource.data = updatedData;
    });
  }

  isAdminUser(): boolean {
    return this.role === 'admin';
  }

}
