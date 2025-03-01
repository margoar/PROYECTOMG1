import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Curso } from "../../modelo/curso.modelo";
import { Profesor } from "../../modelo/profesor.modelo";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'https://localhost:7041/api/curso';
  private apiMatriculaUrl = 'https://localhost:7041/api/matricula'; 


    // Estado del curso seleccionado
  private cursoSeleccionado = new BehaviorSubject<Curso | null>(null);
  cursoSeleccionado$ = this.cursoSeleccionado.asObservable();

  constructor(private http: HttpClient, private loginServices : AuthService) {}

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
  obtenerCursoPorId(cursoID: number, anioMatricula: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/obtener-curso/${cursoID}`, {
      params: {
        anioMatricula: anioMatricula
      }
    });
  }
  obtenerProfesores(): Observable<Profesor[]> {
    const tipoUsuarioId = this.loginServices.getUserInfo().tipoUsuarioId; // Obtiene el tipoUsuario
    return this.http.get<Profesor[]>(`${this.apiUrl}/obtener-profesores?tipoUsuarioId=${tipoUsuarioId}`);
  }

    // Método para editar el profesor jefe del curso
    editarProfesorCurso(cursoId: number, profesorId: number): Observable<number> {
      return this.http.put<number>(`${this.apiUrl}/editar-profesorjefe`, { cursoId, profesorId });
    }
}



