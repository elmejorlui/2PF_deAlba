import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private baseUrl = `${enviroment.apiBaseUrl}/cursos`;

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${enviroment.apiBaseUrl}/cursos`)
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.baseUrl, curso);
  }

  editarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseUrl}/${curso.id}`, curso);
  }

  eliminarCurso(cursoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cursoId}`);
  }
}
