import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { CursoService } from '../../core/services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos-por-nivel',
  standalone : true,
  imports: [RouterModule,FormsModule],
  templateUrl: './cursos-por-nivel.component.html',
  styleUrl: './cursos-por-nivel.component.css'
})
export class CursosPorNivelComponent {
  id: string | null = null;
  anios: number[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  cursos: any[] = [];


  constructor(
      private route : ActivatedRoute,private cursoService: CursoService){}

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL
      this.cargarAnios();
      this.obtenerCursos();
    }

    cargarAnios() {
      this.cursoService.obtenerAnios().subscribe({
        next: (data) => {
          this.anios = data.map(item => item.anioEscolar);
        },
        error: (err) => {
          console.error("Error obteniendo años:", err);
        }
      });
    }

    obtenerCursos() {
      const nivelId = this.id ? parseInt(this.id, 10) : 0;
      const anioMatricula = this.anioSeleccionado || 0;
  
      this.cursoService.obtenerCursosPorNivel(nivelId, anioMatricula).subscribe({
        next: (data) => {
          this.cursos = data;
        },
        error: (err) => {
          console.error("Error obteniendo cursos:", err);
        }
      });
    }
  
}
