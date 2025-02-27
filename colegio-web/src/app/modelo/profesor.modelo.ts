import { Usuario } from "./usuario.modelo";

export interface Profesor {
    idProfesor?:number;
    nombreProfesor?: string;
    rut?: string;
    fechaNacimiento:  string;
    tipoContrato?: string;
    tituloProfesional? :string;
    telefono:string;
    nacionalidad? : number;
    genero? : number;
    usuario: Usuario;
    
}
