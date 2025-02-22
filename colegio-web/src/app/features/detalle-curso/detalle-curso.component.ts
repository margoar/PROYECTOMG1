import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../modelo/curso.modelo';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';
import { Alumno } from '../../modelo/alumno.modelo';
import { AlumnoService } from '../../core/services/alumno.service';
import { ListadoInscritosComponent } from '../listado-inscritos/listado-inscritos.component';
import { AsignaturasPorCursoComponent } from '../asignaturas-por-curso/asignaturas-por-curso.component';
import { HorarioCursoComponent } from '../horario-curso/horario-curso.component';


@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule,RouterModule, ListadoPostulantesComponent, ListadoInscritosComponent,AsignaturasPorCursoComponent,HorarioCursoComponent],
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
    anioEscolar:0,
    asignaturas: [],  // Agregado, si tienes asignaturas
    alumnos: []  // Agregado, si tienes alumnos
  }

  postulantes?: Alumno[] | null = null;


  constructor(private location: Location, private cursoService : CursoService, private alumnoService : AlumnoService,private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL
    this.obtenerCursoPorId();
    this.obtenerPostulantes();


 
  }

  actualizarDatos() {
    this.obtenerCursoPorId(); // Esto actualizará los inscritos
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

  obtenerPostulantes() {
    const cursoId = this.curso.cursoId;

    this.alumnoService.obtenerPostulantesPorNivelyAnio(2,2025).subscribe({
      next: (data) => {
        this.postulantes = data;  // Esto actualiza los postulantes
        console.log("postulantes");
        console.log(this.postulantes);
      },
      error: (err) => {
        console.error('Error obteniendo postulantes:', err);
      }
    });
  }

  actualizarListas() {
    this.obtenerCursoPorId();    // Actualiza los inscritos
    this.obtenerPostulantes();   // Actualiza los postulantes
  }

}