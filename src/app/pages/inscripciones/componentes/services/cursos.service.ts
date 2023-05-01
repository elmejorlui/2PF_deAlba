import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripciones[]>([
    {
      id:1,
      alumnoId: 1,
      cursoId: 1,
      alumno: 'Kilian',
      curso: 'Angular',
      fecha_inicio: new Date(),
    },
    {
      id: 2,
      alumnoId: 2,
      cursoId: 2,
      alumno: 'Elia',
      curso: 'React',
      fecha_inicio: new Date(),
    },
    {
      id: 3,
      alumnoId: 3,
      cursoId: 3,
      alumno: 'Edurne',
      curso: 'Android',
      fecha_inicio: new Date(),
    },
  ])

  constructor() { }

  obtenerInscripciones(): Observable<Inscripciones[]> {
    return this.inscripciones$.asObservable();
  }

  obtenerInscripcionesPorId(id: number): Observable<Inscripciones | undefined>{
    return this.inscripciones$.asObservable()
    .pipe(
      map((inscripciones) => inscripciones.find((a) => a.id === id))
    )
  }

  obtenerInscripcionesPorAlumnoId(id: number): Observable<Inscripciones | undefined>{
    return this.inscripciones$.asObservable()
    .pipe(
      map((inscripciones) => inscripciones.find((a) => a.alumnoId === id))
    )
  }

  obtenerInscripcionesPorCursoId(id: number): Observable<Inscripciones | undefined>{
    return this.inscripciones$.asObservable()
    .pipe(
      map((inscripciones) => inscripciones.find((a) => a.cursoId === id))
    )
  }
}
