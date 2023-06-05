import { UsuariosComponent } from './usuarios.component';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './store/usuarios.effects';
import { usuariosFeature } from './store/usuarios.reducer';
import { StoreModule } from '@ngrx/store';




@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    DirectivesModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    StoreModule.forFeature(usuariosFeature),
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent
      }
    ]),
    EffectsModule.forFeature([UsuariosEffects]),
  ]
})

export class UsuariosModuleTsModule { }