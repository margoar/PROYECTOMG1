import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Profesor } from '../../modelo/profesor.modelo';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  
  private apiUrl = `${environment.apiUrl}/api/profesor`; 
  
  private profesorRef: any;
  constructor(private http: HttpClient, private loginServices : AuthService
  ) {}

  obtenerProfesores(): Observable<Profesor[]> {
    const tipoUsuarioId = this.loginServices.getUserInfo().tipoUsuarioId; // Obtiene el tipoUsuario

    return this.http.get<Profesor[]>(`${this.apiUrl}/obtener-profesores?tipoUsuarioId=${tipoUsuarioId}`);
  }
  agregarProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.apiUrl}/crear-profesor`, profesor);
  }

  getProfesorPorId(id:string) :Observable<Profesor | null>{
    const profesorRef =  this.http.get<Profesor>(`${this.apiUrl}/obtener-profesor/${id}`);
    return profesorRef;
  }
  modificarProfesor(id: number, profesor: Profesor): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar-profesor/${id}`, profesor);
  }
  
  eliminarProfesor(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/eliminar-profesor/${id}`, {});
  }

  obtenerNacionalidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nacionalidades`);
  }

  obtenerTiposContratos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tiposContratos`);
  }

  getCursosPorProfesorId(idProfesor:number) :Observable<any | null>{
    const cursos =  this.http.get<any>(`${this.apiUrl}/obtener-cursos/${idProfesor}`);
    return cursos;
  }
}
