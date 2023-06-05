import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { UsuariosActions } from './usuarios.actions';
import { Usuario } from '../componentes/models/indesx';

export const usuariosFeatureKey = 'usuarios';

export interface State {
    loading: boolean;
    usuarios: Usuario[];
    error: unknown;
}

export const initialState: State = {
    loading: false,
    usuarios: [],
    error: null,
};

export const reducer = createReducer<State>(
    initialState,
    on(UsuariosActions.loadUsuarios, state => {
        return {
            ...state,
            loading: true
        }
    }),

    on(UsuariosActions.loadUsuariosSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            usuarios: action.data
        }
    }),

    on(UsuariosActions.loadUsuariosFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),

    on(UsuariosActions.deleteUsuarios, (state) => {
        return {
            ...state,
            loading: true
        }
    }),


    on(UsuariosActions.deleteUsuariosSuccess, (state, action) => {
        return {
            ...state,
            usuarios: state.usuarios.filter((u) => u.id !== action.data),
            loading: false
        }
    }),

    on(UsuariosActions.deleteUsuariosFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    }),

    on(UsuariosActions.createUsuarios, (state) => {
        return {
            ...state,
            loading: true
        }
    }),

    on(UsuariosActions.createUsuariosSuccess, (state, action) => {
        const newUsuario = action.data;
        return {
            ...state,
            loading: false,
            usuarios: [...state.usuarios, newUsuario]
        }
    }),

    on(UsuariosActions.createUsuariosFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    }),

);

export const usuariosFeature = createFeature({
    name: usuariosFeatureKey,
    reducer,
});
export const createUsuarios = createAction(
    '[Usuarios] Crear Usuario',
    props<{ data: Usuario }>()
);

export const createUsuariosSuccess = createAction(
    '[Usuarios] Crear Usuario Exitoso',
    props<{ data: Usuario }>()
);

export const createUsuariosFailure = createAction(
    '[Usuarios] Crear Usuario Fallido',
    props<{ error: any }>()
);

export { createReducer };