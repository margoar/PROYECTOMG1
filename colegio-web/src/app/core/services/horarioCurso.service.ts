import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Curso } from "../../modelo/curso.modelo";
import { HorarioCurso } from "../../modelo/horarioCurso.modelo";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class HorarioCursoService {
  
  private apiUrl = `${environment.apiUrl}/api/horarioCurso`; 
  
  constructor(private http: HttpClient) {}

  semana(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/semana`);
  }

  obtenerHorarioPorCursoId(cursoID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-horario/${cursoID}`);
  }

  obtenerTramos() :Observable <any []>{
    return this.http.get<any[]>(`${this.apiUrl}/tramos`);

  }
}
