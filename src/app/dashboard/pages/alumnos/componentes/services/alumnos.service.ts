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
      nombre: 'Victorine',
      apellido: 'Vilmantė',
      correo: 'victorine@mail.com',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 2,
      nombre: 'Alhaji',
      apellido: 'Alia',
      correo: ' alhajialia@mail.com',
      pais: 'India',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 3,
      nombre: 'Edurne',
      apellido: 'Carballo',
      correo: 'edurne@mail.com',
      pais: 'Peru',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 4,
      nombre: 'Klava',
      apellido: 'Franck',
      correo: 'klavaf@mail.com',
      pais: 'Peru',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 5,
      nombre: 'Geetha',
      apellido: 'Karan',
      correo: 'gee_karan@mail.com',
      pais: 'Peru',
      fecha_registro: new Date(),
      acciones: 'hola'
    },
    {
      id: 6,
      nombre: 'Dayton',
      apellido: 'Geboom',
      correo: 'daytong@mail.com',
      pais: 'Peru',
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
