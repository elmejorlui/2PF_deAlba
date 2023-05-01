import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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

  cursoControl = new FormControl('',
  [
    Validators.required,
  ]
  );

  paisControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3)
  ]
  );

  alumnoForms = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    correo: this.emailControl,
    curso: this.cursoControl,
    pais: this.paisControl
  })

  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
      if (data) {
        this.nombreControl.setValue(data.alumnoParaEditar.nombre);
        this.apellidoControl.setValue(data.alumnoParaEditar.apellido);
        this.emailControl.setValue(data.alumnoParaEditar.correo);
        this.cursoControl.setValue(data.alumnoParaEditar.curso);
        this.paisControl.setValue(data.alumnoParaEditar.pais);
      }
    }

  guardar():void {
    if (this.alumnoForms.valid){
      this.dialogRef.close(this.alumnoForms.value)
    } else {
      this.alumnoForms.markAllAsTouched();
    }

  }
}
