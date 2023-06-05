import { Injectable } from '@angular/core';
import { Alumno } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos$: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);

  constructor(
    private http: HttpClient
    ) {
    this.fetchAlumnos();
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  private fetchAlumnos() {
    this.http
      .get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`)
      .subscribe(
        (alumnos) => {
          this.alumnos$.next(alumnos);
        },

      );
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.alumnos$.asObservable().pipe(
      map((alumnos) => alumnos.find((a: Alumno) => a.id === id))
    );
  }

}
