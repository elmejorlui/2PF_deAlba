import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { usuarioService } from './componentes/usuarios.service';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { Usuario } from './componentes/models/indesx';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'nombre', 'correo', 'contrasena', 'acciones'];

  constructor(
    private usuariosService: usuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
    });
  }

  crearUsuario(): void {
    const dialog = this.dialog.open(AbmUsuariosComponent);

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.usuariosService.crearUsuario(formValue)
        }
      });
  }

  editarUsuario(usuario: Usuario): void {
    const dialog = this.dialog.open(AbmUsuariosComponent, {
      data: {
        usuario,
      }
    })

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.usuariosService.editarUsuario(usuario.id, formValue);
        }
      })
  }

  eliminarUsuario(usuario: Usuario): void {
    if (confirm('Esta Seguro?'))
      this.usuariosService.eliminarUsuario(usuario.id);
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

}

