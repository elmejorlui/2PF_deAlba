import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InscripcionesService {

    private inscripciones$ = new BehaviorSubject<Inscripciones[]>([
        {
            id: 1,
            alumnoId: 1,
            cursoId: 1,
            alumno: 'Victorine',
            curso: 'Angular',
            fecha_inicio: new Date(),
        },
        {
            id: 2,
            alumnoId: 1,
            cursoId: 2,
            alumno: 'Victorine',
            curso: 'React',
            fecha_inicio: new Date(),
        },
        {
            id: 3,
            alumnoId: 1,
            cursoId: 3,
            alumno: 'Victorine',
            curso: 'Android',
            fecha_inicio: new Date(),
        },
        {
            id: 4,
            alumnoId: 2,
            cursoId: 1,
            alumno: 'Alhaji',
            curso: 'Angular',
            fecha_inicio: new Date(),
        },
        {
            id: 5,
            alumnoId: 2,
            cursoId: 2,
            alumno: 'Alhaji',
            curso: 'React',
            fecha_inicio: new Date(),
        },
        {
            id: 6,
            alumnoId: 3,
            cursoId: 3,
            alumno: 'Edurne',
            curso: 'Android',
            fecha_inicio: new Date(),
        },
        {
            id: 7,
            alumnoId: 4,
            cursoId: 1,
            alumno: 'Klava',
            curso: 'Angular',
            fecha_inicio: new Date(),
          },
          {
            id: 8,
            alumnoId: 5,
            cursoId: 1,
            alumno: 'Geetha',
            curso: 'Angular',
            fecha_inicio: new Date(),
          },
          {
            id: 9,
            alumnoId: 6,
            cursoId: 3,
            alumno: 'Dayton',
            curso: 'Android',
            fecha_inicio: new Date(),
          },
    ])

    constructor() { }

    obtenerInscripciones(): Observable<Inscripciones[]> {
        return this.inscripciones$.asObservable();
    }

    obtenerInscripcionesPorId(id: number): Observable<Inscripciones | undefined> {
        return this.inscripciones$.asObservable()
            .pipe(
                map((inscripciones) => inscripciones.find((a) => a.id === id))
            )
    }

    obtenerInscripcionesPorAlumnoId(id: number): Observable<Inscripciones | undefined> {
        return this.inscripciones$.asObservable()
            .pipe(
                map((inscripciones) => inscripciones.find((a) => a.alumnoId === id))
            )
    }

    obtenerInscripcionesPorCursoId(id: number): Observable<Inscripciones | undefined> {
        return this.inscripciones$.asObservable()
            .pipe(
                map((inscripciones) => inscripciones.find((a) => a.cursoId === id))
            )
    }
}
