export interface NavItem {
  path: string;
  title: string;
  icon?: string;
  allowedRoles: string[];
}

const links: NavItem[] = [
  {
    path: 'estudiantes',
    title: 'Alumnos',
    icon: 'persona,',
    allowedRoles: [],
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school,',
    allowedRoles: [],
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'add,',
    allowedRoles: [],
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'group',
    allowedRoles: ['admin'],
  },
]

export default links;


