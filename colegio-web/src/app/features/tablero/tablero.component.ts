import { Component } from '@angular/core';
import { ProfesoresComponent } from '../profesores/profesores.component';
import { AlumnosComponent } from '../alumnos/alumnos.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [ProfesoresComponent,AlumnosComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
