import { Injectable } from '@angular/core';
import { CrearUsuarioPayload, Usuario } from './models/indesx';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { enviroment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  private usuarios$ = new BehaviorSubject<Usuario[]>([]);

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
  }

  getUsuarioById(usuarioId: number): Observable<unknown> {
    return this.http.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios/${usuarioId}`)
  }

  crearUsuario(payload: CrearUsuarioPayload): Observable<Usuario[]> {
    this.usuarios$.pipe(take(1)).subscribe({
      next: (usuarios) => {
        this.usuarios$.next([
          ...usuarios,
          {
            id: usuarios.length + 1,
            ...payload,
          },
        ]);
      },
    });
    return this.usuarios$.asObservable();
  }

  editarUsuario(
    usuarioId: number,
    actualizacion: Partial<Usuario>
  ): Observable<Usuario[]> {
    this.usuarios$.pipe(take(1)).subscribe({
      next: (usuarios) => {
        const cursosActualizados = usuarios.map((usuario) => {
          if (usuario.id === usuarioId) {
            return {
              ...usuario,
              ...actualizacion,
            };
          } else {
            return usuario;
          }
        });
        this.usuarios$.next(cursosActualizados);
      },
    });
    return this.usuarios$.asObservable();
  }

  eliminarUsuario(usuarioId: number): Observable<unknown> {
    return this.http.delete(`${enviroment.apiBaseUrl}/usuarios/${usuarioId}`);
  }
}
