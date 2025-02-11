import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Asignatura } from "../../modelo/asignatura.modelo";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
  private apiUrl = 'https://localhost:7041/api/asignatura'; // Reemplaza con la URL de tu API
  constructor(private http: HttpClient
  ) {}

  obtenerAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}/obtener-asignaturas`);
  }
}