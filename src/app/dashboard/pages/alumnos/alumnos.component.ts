import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../alumnos/componentes/models/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  authUser$: Observable<Usuario | null>;

  dataSource = new MatTableDataSource<Alumno>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'correo', 'pais', 'fecha_registro', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private router: Router,
    private activatesRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {

    this.authUser$ = this.authService.obtenerUsuarioAutenticado();

    this.http.get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`)
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
      const url = `${enviroment.apiBaseUrl}/alumnos/${alumnoForDelete.id}`;
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.delete(url, { headers }).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(
            (alumnoActual) => alumnoActual.id !== alumnoForDelete.id
          );
        },
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
        const url = `${enviroment.apiBaseUrl}/alumnos/${alumnoParaEditar.id}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        this.http.put(url, dataDelAlumnoEditado, { headers }).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(
              (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = { ...alumnoParaEditar, ...dataDelAlumnoEditado };
              this.dataSource = new MatTableDataSource(this.dataSource.data);
            }
          },
        );
      }
    })
  }

}
