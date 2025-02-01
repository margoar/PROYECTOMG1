import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Profesor } from '../../modelo/profesor.modelo';


@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private apiUrl = 'https://localhost:7041/api/profesor'; // Reemplaza con la URL de tu API
  //profesores: Observable<Profesor[]>;
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

}
