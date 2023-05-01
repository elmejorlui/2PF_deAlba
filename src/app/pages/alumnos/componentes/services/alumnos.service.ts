import { Injectable } from '@angular/core';
import { Alumno } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Kilian',
      apellido: 'Diez',
      correo: 'Kilian@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 2,
      nombre: 'Elia',
      apellido: 'Paz',
      correo: 'Elia@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 3,
      nombre: 'Edurne',
      apellido: 'Carballo',
      correo: 'Edurne@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
  ])

  constructor() { }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }

}
