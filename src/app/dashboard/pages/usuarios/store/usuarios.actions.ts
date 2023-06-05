import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearUsuarioPayload, Usuario } from '../componentes/models/indesx';

export const UsuariosActions = createActionGroup({
    source: 'Usuarios',
    events: {
        'Load Usuarios': emptyProps(),
        'Load Usuarios Success': props<{ data: Usuario[] }>(),
        'Load Usuarios Failure': props<{ error: unknown }>(),
        'Delete Usuarios': props<{ id: number }>(),
        'Delete Usuarios Success': props<{ data: number }>(),
        'Delete Usuarios Failure': props<{ error: unknown }>(),
        'Create Usuarios': props<{ data: Usuario }>(),
        'Create Usuarios Success': props<{ data: Usuario }>(),
        'Create Usuarios Failure': props<{ error: unknown }>(),
    }
});