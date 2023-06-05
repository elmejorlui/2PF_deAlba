import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer } from "./auth/auth.reducer";

export interface Appstate {
    [authFeatureKey]: any
}


export const actionReducerMap: ActionReducerMap<Appstate> = {
    [authFeatureKey]: authReducer,
}