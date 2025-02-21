export interface Curso {
    cursoId?: number;
    nivelId?: number;
    nombreNivel?: string;
    nombreCurso?: string;
    profesorId?: number;
    profesorJefe?: string;
    inscritos?: number;
    disponibilidad?: number;
    vacantes?: number;
    asignaturas?: any[];  // Si AsignaturaDTO tiene un modelo, usa su interfaz
    alumnos?: any[];  // Si Alumno tiene un modelo, usa su interfaz
}
