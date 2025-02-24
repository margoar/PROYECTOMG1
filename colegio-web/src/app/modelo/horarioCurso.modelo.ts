export interface HorarioCurso {

    cursoId: number;
    asignaturaId: number;
    nombreAsignatura: string;
    horarioId: number;
    horaInicio: string; // Puedes mantenerlo como string en formato 'HH:mm:ss'
    horaFin: string; // También en formato 'HH:mm:ss'
    diaSemanaId: number;
    diaSemana: string;
}