import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7041/api/auth'; // Cambia la URL a la de tu API
  private jwtHelper = new JwtHelperService();
  private tokenKey = 'auth-token';
  constructor(private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log(response);
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('usuarioId', response.usuarioId);
          localStorage.setItem('nombre', response.nombre);
          localStorage.setItem('correoUsuario', response.correoUsuario);
          localStorage.setItem('tipoUsuario', response.tipoUsuario);
          localStorage.setItem('tipoUsuarioId', response.tipoUsuarioId);

        }
      })
    );
  }
  getUserInfo() {
    return {
      token: localStorage.getItem(this.tokenKey),
      usuarioId: localStorage.getItem('usuarioId'),
      nombre: localStorage.getItem('nombre'),
      correoUsuario: localStorage.getItem('correoUsuario'),
      tipoUsuario: localStorage.getItem('tipoUsuario'),
      tipoUsuarioId: localStorage.getItem('tipoUsuarioId'),

    }
  }
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }


}
