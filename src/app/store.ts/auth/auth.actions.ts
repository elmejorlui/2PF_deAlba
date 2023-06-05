import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/core/models";

export const EstablecerUsuariosAutenticado = createAction(
    '[auth] Establecer usuario',
    props<{ payload: Usuario }>(),
);

export const QuitarUsuarioAuntrnticado = createAction('[auth] Quitar usuario')
