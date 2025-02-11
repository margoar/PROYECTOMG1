import { Component } from '@angular/core';
import { ProfesoresComponent } from '../profesores/profesores.component';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { CursosComponent } from '../cursos/cursos.component';
import { AsignaturasComponent } from '../asignaturas/asignaturas.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [ProfesoresComponent,AlumnosComponent,CursosComponent,AsignaturasComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
