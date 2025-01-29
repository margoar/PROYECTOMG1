import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfesoresService } from '../../core/services/profesores.service';

@Component({
  selector: 'app-profesores',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent {
  profesores: any[] = [];

  constructor(private profesoresService: ProfesoresService) {}

  ngOnInit(): void {
    this.profesoresService.obtenerProfesores().subscribe(
      data => {
        console.log("profesores");
        console.log(data)
        this.profesores = data;
      },
      error => {
        console.error('Error obteniendo profesores:', error);
      }
    );
  }
}
