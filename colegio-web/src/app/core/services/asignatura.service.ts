import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CursoAsignatura } from "../../modelo/cursoAsignatura.modelo";
import { Asignatura } from "../../modelo/asignatura.modelo";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
  private apiUrl = `${environment.apiUrl}/api/asignatura`; // Ahora la ruta específica se agrega aquí  
  
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