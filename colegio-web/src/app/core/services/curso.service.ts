import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { Observable } from "rxjs";
import { Curso } from "../../modelo/curso.modelo";

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'https://localhost:7041/api/curso';
  private apiMatriculaUrl = 'https://localhost:7041/api/matricula'; 

  constructor(private http: HttpClient
  ) {}

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.apiUrl}/obtener-niveles`);
  }

  obtenerAnios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiMatriculaUrl}/obtener-anios`);
  }
  obtenerCursosPorNivel(nivelId: number, anioMatricula: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/obtener-cursos/${nivelId}`, {
      params: {
        anioMatricula: anioMatricula
      }
    });
  }
  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/crear-curso`, curso);
  }

  
  
}
