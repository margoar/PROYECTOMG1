import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nivel } from '../../modelo/nivel.modelo';
import { CursoService } from '../../core/services/curso.service';

@Component({
  selector: 'app-cursos',
    standalone: true, // Esto es lo que hace que sea standalone
    imports: [CommonModule, RouterModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
niveles: Nivel[] | null = null;
nivel: Nivel = {
  descripcion: 'rere'
  };

constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarNiveles(); 

  }
  cargarNiveles(): void {
    this.cursoService.obtenerNiveles().subscribe({
      next: (response) => {
        this.niveles = response; 
        console.log(this.niveles);
      },
      error: (error) => {
        console.error('Error al cargar niveles:', error);
      }
    });
  }
}
