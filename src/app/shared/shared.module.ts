import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { FontSizeDirective } from './directives/font-size.directive';
import { DirectivesModule } from './directives/directives.module';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    PipesModule,
    DirectivesModule
  ]
})
export class SharedModule { }
