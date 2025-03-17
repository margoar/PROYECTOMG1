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
import { FormsModule } from '@angular/forms';
import { Profesor } from '../../modelo/profesor.modelo';


@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule,RouterModule, ListadoPostulantesComponent, ListadoInscritosComponent,AsignaturasPorCursoComponent,HorarioCursoComponent,FormsModule],
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
  editando = false;
  inscritos: Alumno[] = [];
  profesores: Profesor [] =[]
  postulantes?: Alumno[] | null = null;


  constructor(private location: Location, private cursoService : CursoService, private alumnoService : AlumnoService,private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener cursoid desde la URL
    this.obtenerCursoPorId();
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
  onPostulanteAgregado() {
    // Llamar a una función que recargue la lista de inscritos
    // Puedes hacerlo, por ejemplo, llamando a un servicio o actualizando la lista manualmente
    this.cargarInscritos();  // Este método debe ser el que recargue la lista
  }

  cargarInscritos() {
    this.alumnoService.obtenerInscritosPorCursoYAnio(parseInt(this.id!,10) , this.anioSeleccionado).subscribe(data => {
      this.inscritos = data;
    });
  }

  editarProfesor() {
    this.getProfesores();

    this.editando = true;
  }
  
  guardarProfesor(): void {
    if (this.curso.profesorId) {
      const cursoId = parseInt(this.id!, 10);
  
      this.cursoService.editarProfesorCurso(cursoId, this.curso.profesorId).subscribe(
        (response: any) => { 
          console.log('Profesor jefe actualizado:', response);
  
          // 🔹 Actualiza curso.profesorJefe con el nombre del profesor seleccionado
          const profesorSeleccionado = this.profesores.find(p => p.idProfesor === this.curso.profesorId);
          this.curso.profesorJefe = profesorSeleccionado ? profesorSeleccionado.nombreProfesor : 'Sin asignar';
  
          this.editando = false;
        },
        error => {
          console.error('Error al editar el profesor jefe', error);
        }
      );
    }
  }
  
  getProfesores() {
    this.cursoService.obtenerProfesores().subscribe(data => {
      this.profesores = data;
      console.log(this.profesores);
    });
  }
}