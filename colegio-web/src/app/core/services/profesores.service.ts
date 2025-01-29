import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Profesor {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private apiUrl = 'https://localhost:7041/api/profesor'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient, private loginServices : AuthService
  ) {}

  obtenerProfesores(): Observable<Profesor[]> {
    const tipoUsuarioId = this.loginServices.getUserInfo().tipoUsuarioId; // Obtiene el tipoUsuario

    return this.http.get<Profesor[]>(`${this.apiUrl}/obtener-profesores?tipoUsuarioId=${tipoUsuarioId}`);
  }
}
