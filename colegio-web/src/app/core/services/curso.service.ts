import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'https://localhost:7041/api/curso'; // Reemplaza con la URL de tu API
  constructor(private http: HttpClient
  ) {}

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.apiUrl}/obtener-niveles`);
  }
  
}
