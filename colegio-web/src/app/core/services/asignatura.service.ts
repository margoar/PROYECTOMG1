import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CursoAsignatura } from "../../modelo/cursoAsignatura.modelo";
import { Asignatura } from "../../modelo/asignatura.modelo";

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
  obtenerAsignaturasPorCursoId(cursoId?:  number): Observable<CursoAsignatura[]> {
    return this.http.get<CursoAsignatura[]>(`${this.apiUrl}/asignaturas-por-cursoId/${cursoId}`);
  }

  agregarAsignatura(asignatura: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/agregar-asignatura`, asignatura);
  }
  
  
}