import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './componentes/usuarios.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUsuariosState } from './store/usuarios.selector';
import { UsuariosActions } from './store/usuarios.actions';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { State } from './store/usuarios.reducer';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  data: Observable<any[]>;

  constructor(
    private usuariosService: UsuarioService,
    private matDialog: MatDialog,
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
    this.store.dispatch(UsuariosActions.deleteUsuarios({ id }));
  }

  crearUsuario(): void {
    this.matDialog.open(AbmUsuariosComponent)
  }

}
