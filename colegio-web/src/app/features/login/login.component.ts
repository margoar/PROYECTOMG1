import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  mensaje : string | null=null;
  private jwtHelper = new JwtHelperService(); // Instancia del helper de JWT


  constructor (private router:Router,
    private loginServices : AuthService
     
  ){}


  ngOnInit(){
    var token = this.loginServices.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/login']);

    }
  }


  login() {
    if (this.email && this.password) {
      this.loginServices.login(this.email, this.password)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);

            console.log('Login exitoso', response);
          },
          error: (error) => {
            // Manejo del error con validación de estructura
            this.mensaje = 'Error al hacer login: ' + (error.error?.message || 'Error desconocido');
            console.error('Error en login:', error);
          }
        });
    } else {
      this.mensaje = 'Por favor ingresa un email y password válidos';
    }
  }


}
