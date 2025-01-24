import { Component } from '@angular/core';
import { ProfesoresComponent } from '../profesores/profesores.component';

@Component({
  selector: 'app-home',
  imports: [ProfesoresComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidebarVisible: boolean = true;



  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
