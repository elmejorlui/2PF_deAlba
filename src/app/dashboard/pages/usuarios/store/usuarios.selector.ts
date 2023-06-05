import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarios from './usuarios.reducer';

export const selectUsuariosState = createFeatureSelector<fromUsuarios.State>(
    fromUsuarios.usuariosFeatureKey
);