import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Alumno } from '../../modelo/alumno.modelo';


@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiUrl = 'https://localhost:7041/api/alumno'; // Reemplaza con la URL de tu API
  private profesorRef: any;
  constructor(private http: HttpClient, private loginServices : AuthService
  ) {}

  obtenerAlumno(): Observable<Alumno[]> {
    const tipoUsuarioId = this.loginServices.getUserInfo().tipoUsuarioId; // Obtiene el tipoUsuario

    return this.http.get<Alumno[]>(`${this.apiUrl}/obtener-alumnos?tipoUsuarioId=${tipoUsuarioId}`);
  }
  agregarAlumno(profesor: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/crear-alumno`, profesor);
  }

}
