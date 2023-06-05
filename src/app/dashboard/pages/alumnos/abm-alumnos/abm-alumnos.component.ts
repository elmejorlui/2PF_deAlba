import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';


@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent {

  nombreControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
    ]
  );

  apellidoControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  );

  emailControl = new FormControl('',
    [
      Validators.required,
      Validators.email
    ]
  );

  paisControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  );

  fechaControl = new FormControl('',
    [
      Validators.required,
    ]
  );

  alumnoForms = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    correo: this.emailControl,
    pais: this.paisControl,
    fecha_registro: new FormControl()
  })

  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient
  ) {
    if (data) {
      this.nombreControl.setValue(data.alumnoParaEditar.nombre);
      this.apellidoControl.setValue(data.alumnoParaEditar.apellido);
      this.emailControl.setValue(data.alumnoParaEditar.correo);
      this.paisControl.setValue(data.alumnoParaEditar.pais);
      this.fechaControl.setValue(data.alumnoParaEditar.fecha);
    }
  }

  guardar(): void {
    if (this.alumnoForms.valid) {
      const alumno = {
        ...this.alumnoForms.value,
        fecha_registro: new Date().toISOString()
      };

      if (this.data && this.data.alumnoParaEditar) {
        const url = `${enviroment.apiBaseUrl}/alumnos/${this.data.alumnoParaEditar.id}`;
        this.http.put<any>(url, alumno).subscribe({
          next: (response) => {
            this.dialogRef.close(alumno);
          },
        });
      } else {
        this.http.post<any>(enviroment.apiBaseUrl + '/alumnos', alumno).subscribe({
          next: (response) => {
            this.dialogRef.close(alumno);
          },
        });
      }
    } else {
      this.alumnoForms.markAllAsTouched();
    }
  }
}
