import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true, // Esto indica que el componente es standalone
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      (response) => {
        this.authService.setToken(response.token); // Guarda el token en localStorage o donde lo necesites
        this.router.navigate(['/home']); // Redirige a la página principal o la página deseada
      },
      (error) => {
        this.errorMessage = 'Error de autenticación. Intenta de nuevo.';
      }
    );
  }
}

