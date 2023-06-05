import { ActionReducerMap } from "@ngrx/store";
import { reducer, usuariosFeatureKey } from "./usuarios.reducer";


export interface Appstate {
    [usuariosFeatureKey]: any
}


export const actionReducerMap: ActionReducerMap<Appstate> = {
    [usuariosFeatureKey]: reducer,
}