import { Component } from '@angular/core';
import { ProfesoresComponent } from '../profesores/profesores.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [ProfesoresComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
