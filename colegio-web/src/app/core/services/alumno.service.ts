import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Alumno } from '../../modelo/alumno.modelo';
import { Matricula } from '../../modelo/matricula.modelo';
import { Apoderado } from '../../modelo/apoderado.modelo';
import { Curso } from '../../modelo/curso.modelo';


@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiUrl = 'https://colegiowebapi.somee.com/api/alumno'; // Reemplaza con la URL de tu API
  private alumnoRef: any;
  constructor(private http: HttpClient, private loginServices : AuthService
  ) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    const tipoUsuarioId = this.loginServices.getUserInfo().tipoUsuarioId; // Obtiene el tipoUsuario

    return this.http.get<Alumno[]>(`${this.apiUrl}/obtener-alumnos?tipoUsuarioId=${tipoUsuarioId}`);
  }
  agregarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/crear-alumno`, alumno);
  }

  getAlumnoPorId(id:string) :Observable<Alumno | null>{
    const alumnoRef =  this.http.get<Alumno>(`${this.apiUrl}/obtener-alumno/${id}`);
    return alumnoRef;
  }

  modificarAlumno(id: number, alumno: Alumno): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar-alumno/${id}`, alumno);
  }
    
  eliminarAlumno(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/eliminar-alumno/${id}`, {});
  }

  obtenerPostulantesPorNivelyAnio(nivelId?: number, anioMatricula?: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/obtener-postulantes?nivelId=${nivelId}&anioMatricula=${anioMatricula}`);
  }
  inscribirAlumno(alumno: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.apiUrl}/inscribir-alumno`, alumno);
  }

  obtenerInscritosPorCursoYAnio(cursoID: number, anioMatricula: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/obtener-inscritos/${cursoID}`, {
      params: {
        anioMatricula: anioMatricula
        }
      });
    }

  getApoderadoPorAlumnoid(id:string) :Observable<Apoderado | null>{
    const apoderadoRef =  this.http.get<Apoderado>(`${this.apiUrl}/obtener-apoderado/${id}`);
    return apoderadoRef;
  }

  pagarMatricula(id: string): Observable<any> {
    // Suponiendo que solo estás actualizando el estado del alumno
    return this.http.put(`${this.apiUrl}/pagar-matricula/${id}`, {});
  }
  
  obtenerCursoPorAlumnoId(alumnoId: number, anioMatricula: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/obtener-curso/${alumnoId}`, {
      params: { anioEscolar: anioMatricula.toString() } // 👈 Asegura que sea string
    });
  }
  
  
}
