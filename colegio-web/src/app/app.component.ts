import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { CabeceroComponent } from './features/cabecero/cabecero.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


}
