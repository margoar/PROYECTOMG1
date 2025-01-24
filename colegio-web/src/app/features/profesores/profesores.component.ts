import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesores',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule], // Importa lo necesario
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent {

}
