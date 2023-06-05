import { Injectable } from '@angular/core';
import { Usuario } from './models/indesx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }

  createUsuario(data: Usuario): Observable<Usuario> {
    const token = this.generarTokenAleatorio();
    const usuarioWithToken = { ...data, token };
    return this.httpClient.post<Usuario>(`${enviroment.apiBaseUrl}/usuarios`, usuarioWithToken);
  }

  generarTokenAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 32;
    const array = new Uint8Array(longitud);
    const caracteresLength = caracteres.length;

    crypto.getRandomValues(array);

    let resultado = '';
    for (let i = 0; i < longitud; i++) {
      resultado += caracteres.charAt(array[i] % caracteresLength);
    }

    return resultado;
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${enviroment.apiBaseUrl}/usuarios/${id}`);
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`);
  }

  deleteUsuarioById(id: number): Observable<unknown> {
    return this.httpClient.delete(`${enviroment.apiBaseUrl}/usuarios/${id}`);
  }

}