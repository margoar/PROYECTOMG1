import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Esto indica que el componente es standalone
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    // Simulación de autenticación
    if (this.loginData.email === 'admin@test.com' && this.loginData.password === '1234') {
      this.router.navigate(['/dashboard']); // Aquí rediriges a otra ruta
    } else {
      this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
    }
  }
}

