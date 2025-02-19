import { Usuario } from "./usuario.modelo";

export interface Profesor {
    idProfesor?:number;
    rut?: string;
    fechaNacimiento:  string;
    tipoContrato?: number;
    tituloProfesional? :string;
    telefono:string;
    nacionalidad? : number;
    genero? : number;
    usuario: Usuario;
    
}
