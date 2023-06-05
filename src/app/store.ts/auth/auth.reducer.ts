import { createReducer, on } from "@ngrx/store";
import { Usuario } from "src/app/core/models";
import { EstablecerUsuariosAutenticado, QuitarUsuarioAuntrnticado } from "./auth.actions";


export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: Usuario | null;
}


const initialState: AuthState = {
    authUser: null,
}

export const authReducer = createReducer(
    initialState,

    on(EstablecerUsuariosAutenticado, (currenState, action) => {
        return {
            authUser: action.payload
        }
    }),

    on(QuitarUsuarioAuntrnticado, (currenState) => {
        return {
            authUser: null
        }
    })

)

