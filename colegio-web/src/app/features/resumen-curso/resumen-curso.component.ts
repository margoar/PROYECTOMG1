import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { CursoService } from '../../core/services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resumen-curso',
  standalone : true,
  imports: [RouterModule,FormsModule],
  templateUrl: './resumen-curso.component.html',
  styleUrl: './resumen-curso.component.css'
})
export class ResumenCursoComponent {
  id: string | null = null;
  anios: number[] = [];
  anioSeleccionado: number = new Date().getFullYear();

  constructor(
      private route : ActivatedRoute,private cursoService: CursoService){}

    ngOnInit() {
      this.cargarAnios();
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
}
