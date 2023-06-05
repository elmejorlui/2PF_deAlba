export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  token?: string;
  role: string;
}

export interface CrearUsuarioPayload {
  nombre: string;
  email: string;
  password: string;
  role: string;
}