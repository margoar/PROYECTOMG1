import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { Observable } from "rxjs";

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

}
