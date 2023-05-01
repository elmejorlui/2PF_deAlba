import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/pages/alumnos/componentes/models/index';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {

    const newValue = `${value.nombre} ${value.apellido}`;

    switch (args[0]) {
      case 'mayusculas':
        return newValue.toUpperCase();
        case 'minusculas':
          return newValue.toLocaleLowerCase();
      default:
        return newValue;
    }
  }

}
