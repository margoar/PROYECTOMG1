import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nivel } from "../../modelo/nivel.modelo";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Curso } from "../../modelo/curso.modelo";
import { Profesor } from "../../modelo/profesor.modelo";
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";
import { TipoContrato } from "../../modelo/tipoContrato";
import { Nacionalidad } from "../../modelo/nacionalidad.modelo";

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {

  private apiUrl = `${environment.apiUrl}/api/configuracion`; 

    // Estado del curso seleccionado
  private cursoSeleccionado = new BehaviorSubject<Curso | null>(null);
  cursoSeleccionado$ = this.cursoSeleccionado.asObservable();

  constructor(private http: HttpClient, private loginServices : AuthService) {}

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.apiUrl}/obtener-niveles`);
  }

  obtenerTiposContratos(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(`${this.apiUrl}/obtener-tipos-contratos`);
  }
  obtenerGeneros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtener-generos`);
  }

  obtenerParentescos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtener-parentescos`);
  }

  obtenerNacionalidades(): Observable<Nacionalidad[]> {
    return this.http.get<Nacionalidad[]>(`${this.apiUrl}/obtener-nacionalidades`);
  }

  insertarElemento(categoria: string, descripcion: string): Observable<number> {
    let endpoint = '';
  
    switch (categoria) {
      case 'Niveles':
        endpoint = 'insertar-nivel';
        break;
      case 'Parentesco':
        endpoint = 'insertar-parentesco';
        break;
      case 'Géneros':
        endpoint = 'insertar-genero';
        break;
      case 'Tipos de Contrato':
        endpoint = 'insertar-tipo-contrato';
        break;
      case 'Nacionalidades':
        endpoint = 'insertar-nacionalidad';
        break;
      default:
        throw new Error('Categoría no reconocida');
    }
  
    // Enviar JSON correctamente
    return this.http.post<number>(`${this.apiUrl}/${endpoint}`, JSON.stringify(descripcion), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  

}



