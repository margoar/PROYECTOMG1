import { Apoderado } from "./apoderado.modelo";
import { Matricula } from "./matricula.modelo";

export interface Alumno {
    alumnoID?:number;
    nombres?: string;
    apellidoPaterno?:string;
    apellidoMaterno?:string;
    rut?: string;
    fechaNacimiento:  string;
    genero?: string;
    direccion? :string;
    telefono? :string;
    estadoEstudiante:string;
    apoderado : Apoderado
    matricula:Matricula

}
