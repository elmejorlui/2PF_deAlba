import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbmCursosComponent } from '../../cursos/abm-cursos/abm-cursos.component';
import { Usuario } from 'src/app/core/models';
import { UsuarioService } from '../componentes/usuarios.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { UsuariosActions } from '../store/usuarios.actions';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss']
})
export class AbmUsuariosComponent implements OnInit, OnDestroy {
  usuario: Usuario[] | undefined

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  correoControl = new FormControl('', [Validators.required, Validators.email]);
  contrasenaControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  roleControl = new FormControl('', [Validators.required]);

  usuarioForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.correoControl,
    password: this.contrasenaControl,
    role: this.roleControl
  });

  destroyed$ = new Subject<void>();

  constructor(
    private usuariosService: UsuarioService,
    private dialogRef: DialogRef<AbmUsuariosComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const usuarioParaEditar = data.usuario;
      this.nombreControl.setValue(usuarioParaEditar.nombre);
      this.apellidoControl.setValue(usuarioParaEditar.apellido);
      this.correoControl.setValue(usuarioParaEditar.email);
      this.contrasenaControl.setValue(usuarioParaEditar.password);
      this.roleControl.setValue(usuarioParaEditar.role);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void { }

  onSave(): void {
    this.store.dispatch(
      UsuariosActions.createUsuarios({
        data: this.usuarioForm.value as Usuario,
      })
    );

    this.dialogRef.close();
  }
}