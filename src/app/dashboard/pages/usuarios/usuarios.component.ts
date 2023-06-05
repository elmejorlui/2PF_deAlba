import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { usuarioService } from './componentes/usuarios.service';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { Usuario } from './componentes/models/indesx';
import { Observable, map } from 'rxjs';
import { UsuariosActions } from './store/usuarios.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

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
    private dialog: MatDialog,
    private store: Store<{ usuarios: State }>
  ) {
    this.data = this.store.select(selectUsuariosState).pipe(
      map((state: State) => state.usuarios)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UsuariosActions.loadUsuarios());
  }

  eliminarUsuarioporId(id: number): void {
    this.store.dispatch(UsuariosActions.deleteUsuarios({id}));
  }

  crearUsuario(): void {
    this.dialog.open(AbmUsuariosComponent)
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

}

