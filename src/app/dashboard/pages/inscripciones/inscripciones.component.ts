import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from './componentes/models';
import { InscripcionesService } from './componentes/services/inscripciones.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { enviroment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent {
  dataSource = new MatTableDataSource<Inscripciones>();
  authUser$: Observable<Usuario | null>;
  role: string | null | undefined;
  displayedColumns: string[] = [
    'id',
    'alumno',
    'curso',
    'fecha_inicio',
    'acciones',
  ];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }

  abrirAbmInscripciones(): void {
    const dialogRef = this.matDialog.open(AbmInscripcionesComponent);

    dialogRef.afterClosed().subscribe((nuevaInscripcion) => {
      if (nuevaInscripcion) {
        this.http
          .post<Inscripciones>(
            enviroment.apiBaseUrl + '/inscripciones',
            nuevaInscripcion
          )
          .subscribe((nuevaInscripcion: Inscripciones) => {
            this.dataSource.data = [...this.dataSource.data, nuevaInscripcion];
          });
      }
    });
  }

  ngOnInit(): void {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.authUser$.subscribe((user) => {
      this.role = user?.role;
    });
    this.inscripcionesService
      .obtenerInscripciones()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      });
  }

  eliminarInscripcion(inscripcionId: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      return;
    }

    this.inscripcionesService
      .eliminarInscripcion(inscripcionId)
      .subscribe(() => {
        const updatedData = this.dataSource.data.filter(
          (inscripcion) => inscripcion.id !== inscripcionId
        );
        this.dataSource.data = updatedData;
      });
  }

  isAdminUser(): boolean {
    return this.role === 'admin';
  }
}
