import { Alumno } from "../../../alumnos/componentes/models";
import { Curso } from "../../../cursos/Componentes/models";

export interface Inscripciones {
  id: number;
  alumnoId: number;
  cursoId: number;
  fecha_inscripcion: string;
  alumno?: Alumno;
  curso?: Curso;
}