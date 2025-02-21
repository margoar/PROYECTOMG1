import { Component } from '@angular/core';
import { AlumnoService } from '../../core/services/alumno.service';
import { Alumno } from '../../modelo/alumno.modelo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-postulantes',
  imports: [CommonModule],
  templateUrl: './listado-postulantes.component.html',
  styleUrl: './listado-postulantes.component.css'
})
export class ListadoPostulantesComponent {
  id: string | null = null;
  anioSeleccionado: number = new Date().getFullYear();
  postulantes: Alumno[] | null = null;
  selectedPostulante: any = null;
  isModalOpen = false;

  constructor(private alumnoService: AlumnoService){}

    ngOnInit() {
      this.ObtenerPostulantes();
    
    }

    ObtenerPostulantes() {
      const nivelId = this.id ? parseInt(this.id, 10) : 2;
      const anioMatricula = this.anioSeleccionado || 0;
  
      this.alumnoService.obtenerPostulantesPorNivelyAnio(nivelId, anioMatricula).subscribe({
        next: (data) => {
          console.log(data);
          this.postulantes = data;
        },
        error: (err) => {
          console.error("Error obteniendo cursos:", err);
        }
      });
    }

  
    openModalInscripcion(postulante: Alumno) {
      console.log(postulante);
      this.selectedPostulante = postulante;
      this.isModalOpen = true;  // Abrir el modal
    }
  
    closeModalInscripcion() {
      this.isModalOpen = false;  // Cerrar el modal
    }
  
    confirmarInscripcion() {
      // Lógica para confirmar la inscripción
      console.log('Inscripción confirmada para', this.selectedPostulante);
  
      // Cerrar el modal después de confirmar
      this.isModalOpen = false;
    }
}
