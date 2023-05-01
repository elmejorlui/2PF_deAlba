import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  nombreControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3),
  ]
  );

  apellidoControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(5)
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
    Validators.minLength(5)
  ]
  );

  alumnoForms = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    correo: this.emailControl,
    curso: this.cursoControl,
    pais: this.paisControl
  })

  constructor(private dialogRef: DialogRef) {}

  guardar():void {
    this.dialogRef.close(this.alumnoForms.value)
  }

}
