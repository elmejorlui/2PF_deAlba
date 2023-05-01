interface NavItem {
  path: string;
  title: string;
  icon?: string;
}

const links: NavItem[] = [
  {
    path: 'estudiantes',
    title: 'Alumnos',
    icon: 'persona,'
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school,'
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'add,'
  },
]

export default links;


