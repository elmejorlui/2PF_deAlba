import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models';
import { Curso } from '../../cursos/Componentes/models';
import { CursosService } from '../../cursos/Componentes/services/cursos.service';
import { AlumnosService } from '../../alumnos/componentes/services/alumnos.service';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent {
  alumnoControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  fechaControl = new FormControl('', [Validators.required]);

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  inscripcionesForms = new FormGroup({
    alumnoId: this.alumnoControl,
    cursoId: this.cursoControl,
    alumno: new FormControl(),
    curso: new FormControl(),
    fecha_inscripcion: this.fechaControl,
  });

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });

    this.alumnoControl.valueChanges.subscribe((alumnoId) => {
      if (alumnoId !== null) {
        const id = alumnoId as unknown as number;
        this.alumnosService.obtenerAlumnoPorId(id).subscribe((alumno) => {
          if (alumno) {
            this.inscripcionesForms.patchValue({
              alumno: alumno.nombre,
            });
          }
        });
      }
    });

    this.cursoControl.valueChanges.subscribe((cursoId) => {
      if (cursoId !== null) {
        const id = cursoId as unknown as number;
        this.cursosService.obtenerCursoPorId(id).subscribe((curso) => {
          if (curso) {
            this.inscripcionesForms.patchValue({
              curso: curso.nombre,
            });
          }
        });
      }
    });
  }

  guardar(): void {
    if (this.inscripcionesForms.valid) {
      this.dialogRef.close(this.inscripcionesForms.value);
    } else {
      this.inscripcionesForms.markAllAsTouched();
    }
  }
}
