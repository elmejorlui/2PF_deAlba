import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/index';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { enviroment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';


const baseUrl = `${enviroment.apiBaseUrl}/inscripciones`;

@Injectable({
    providedIn: 'root'
})

export class InscripcionesService {

    private inscripciones$: BehaviorSubject<Inscripciones[]> = new BehaviorSubject<Inscripciones[]>([]);

    constructor(private http: HttpClient) {
        this.fetchInscripciones();
    }

    obtenerInscripciones(): Observable<Inscripciones[]> {
        return this.inscripciones$.asObservable();
    }

    private fetchInscripciones() {
        this.http
            .get<Inscripciones[]>(baseUrl)
            .subscribe((inscripciones) => {
                this.inscripciones$.next(inscripciones);
            });
    }

    obtenerInscripcionPorId(id: number): Observable<Inscripciones | undefined> {
        return this.inscripciones$.asObservable().pipe(
            map((inscripciones) => inscripciones.find((a: Inscripciones) => a.id === id))
        );
    }

    obtenerInscripcionesPorAlumnoId(id: number): Observable<Inscripciones[]> {
        return this.inscripciones$.asObservable().pipe(
            map((inscripciones) => inscripciones.filter((a: Inscripciones) => a.alumnoId === id))
        );
    }

    obtenerInscripcionesPorCursoId(id: number): Observable<Inscripciones[]> {
        return this.inscripciones$.asObservable().pipe(
            map((inscripciones) => inscripciones.filter((a: Inscripciones) => a.cursoId === id))
        );
    }

    eliminarInscripcion(id: number): Observable<void> {
        const url = `${baseUrl}/${id}`;
        return this.http.delete<void>(url).pipe(
            tap(() => {
                this.inscripciones$.next(this.inscripciones$.value.filter(i => i.id !== id));
            })
        );
    }

    guardarInscripcion(inscripcion: Inscripciones): Observable<Inscripciones> {
        return this.http.post<Inscripciones>(baseUrl, inscripcion).pipe(
            map((savedInscripcion) => {
                const inscripciones = this.inscripciones$.value;
                inscripciones.push(savedInscripcion);
                this.inscripciones$.next(inscripciones);
                return savedInscripcion;
            })
        );
    }
}
