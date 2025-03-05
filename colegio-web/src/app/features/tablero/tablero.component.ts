import { Component } from '@angular/core';
import { ProfesoresComponent } from '../profesores/profesores.component';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { CursosComponent } from '../cursos/cursos.component';
import { AsignaturasComponent } from '../asignaturas/asignaturas.component';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuMovilComponent } from '../menu-movil/menu-movil.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CabeceroComponent, PiePaginaComponent,MenuLateralComponent,MenuMovilComponent,RouterOutlet],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
