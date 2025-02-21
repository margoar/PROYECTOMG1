import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../modelo/curso.modelo';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';


@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule,RouterModule, ListadoPostulantesComponent],
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.css'
})
export class DetalleCursoComponent {
  id: string | null = null;
  anioSeleccionado: number = new Date().getFullYear();
  curso:Curso = {
    cursoId: 0,
    nivelId: 0,
    nombreCurso: '',
    nombreNivel: '',
    profesorId: 0,
    profesorJefe: '',  // Agregado
    inscritos: 0,  // Agregado
    disponibilidad: 0,  // Agregado
    vacantes: 0,
    asignaturas: [],  // Agregado, si tienes asignaturas
    alumnos: []  // Agregado, si tienes alumnos
  }

  constructor(private location: Location, private cursoService : CursoService,private route : ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL
    this.obtenerCursoPorId();
 
  }
  volverAtras() {
    this.location.back();
  }
  obtenerCursoPorId() {
    const cursoId = this.id ? parseInt(this.id, 10) : 0;
    const anioMatricula = this.anioSeleccionado || 0;

    this.cursoService.obtenerCursoPorId(cursoId, anioMatricula).subscribe({
      next: (data) => {
        this.curso = data;
      },
      error: (err) => {
        console.error("Error obteniendo curso:", err);
      }
    });
  }

}