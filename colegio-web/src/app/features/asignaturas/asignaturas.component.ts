import { Component } from '@angular/core';
import { Asignatura } from '../../modelo/asignatura.modelo';
import { AsignaturaService } from '../../core/services/asignatura.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './asignaturas.component.html',
  styleUrl: './asignaturas.component.css'
})
export class AsignaturasComponent {
asignaturas: Asignatura[] | null = null;
asignatura: Asignatura = {
  nombreAsignatura: ''
  };

constructor(private asignaturaService: AsignaturaService) {}

  ngOnInit(): void {
    this.cargarAsignaturas(); 

  }
  cargarAsignaturas(): void {
    this.asignaturaService.obtenerAsignaturas().subscribe({
      next: (response) => {
        this.asignaturas = response; 
      },
      error: (error) => {
        console.error('Error al cargar asignaturas:', error);
      }
    });
  }
}
