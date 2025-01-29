import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { CabeceroComponent } from './features/cabecero/cabecero.component';
import { PiePaginaComponent } from './features/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


}
