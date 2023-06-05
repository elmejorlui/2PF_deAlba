import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuariosActions } from './usuarios.actions';
import { UsuarioService } from '../componentes/usuarios.service';

@Injectable()
export class UsuariosEffects {
  createUsuarioss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.createUsuarios),
      concatMap((action) =>
        this.usuarioService.createUsuario(action.data).pipe(
          map((res) => UsuariosActions.createUsuariosSuccess({ data: res })),
          catchError((error) =>
            of(UsuariosActions.createUsuariosFailure({ error }))
          )
        )
      )
    );
  });

  loadUsuarioss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.loadUsuarios),
      concatMap(() =>
        this.usuarioService.getAllUsuarios().pipe(
          map((data) => UsuariosActions.loadUsuariosSuccess({ data })),
          catchError((error) =>
            of(UsuariosActions.loadUsuariosFailure({ error }))
          )
        )
      )
    );
  });

  deleteUsuarioss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.deleteUsuarios),
      concatMap((action) =>
        this.usuarioService.deleteUsuarioById(action.id).pipe(
          map((data) =>
            UsuariosActions.deleteUsuariosSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(UsuariosActions.deleteUsuariosFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}
}
