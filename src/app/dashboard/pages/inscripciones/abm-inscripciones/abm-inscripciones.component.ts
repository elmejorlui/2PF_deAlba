import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models';
import { Curso } from '../../cursos/Componentes/models';
import { CursosService } from '../../cursos/Componentes/services/cursos.service';
import { AlumnosService } from '../../alumnos/componentes/services/alumnos.service';
import { InscripcionesService } from '../componentes/services/cursos.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss']
})
export class AbmInscripcionesComponent {
  alumnoControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('', [Validators.required, Validators.minLength(3),]);
  fechaControl = new FormControl('', [Validators.required,]);

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  inscripcionesForms = new FormGroup({
    curso: this.cursoControl,
    fecha: this.fechaControl
  })

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    private inscripcionesService: InscripcionesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });
  }

  guardar(): void {
    if (this.inscripcionesForms.valid) {
      this.inscripcionesService.obtenerInscripciones().pipe(take(1)).subscribe((inscripciones) => {
        const newId = inscripciones.length + 1;
        const inscripcion = {
          id: newId,
          alumnoId: Number(this.alumnoControl.value),
          cursoId: Number(this.cursoControl.value),
          fecha_inscripcion: this.fechaControl.value as string
        };
        this.inscripcionesService.guardarInscripcion(inscripcion).subscribe((savedInscripcion) => {
          this.dialogRef.close(savedInscripcion);
        });
      });
    } else {
      this.inscripcionesForms.markAllAsTouched();
    }
  }

}
