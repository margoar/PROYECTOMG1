import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlumnoService } from '../../core/services/alumno.service';
import { Alumno } from '../../modelo/alumno.modelo';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../modelo/curso.modelo';
import { forkJoin, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Matricula } from '../../modelo/matricula.modelo';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-listado-postulantes',
  imports: [CommonModule],
  templateUrl: './listado-postulantes.component.html',
  styleUrl: './listado-postulantes.component.css'
})
export class ListadoPostulantesComponent {
  idCurso: string | null = null;
  anio: string | null = null;

  anioSeleccionado: number = new Date().getFullYear();
  selectedPostulante: any = null;
  isModalOpen = false;
  curso:Curso = {
    nivelId:0,
    cursoId:0,
    nombreCurso:'',
    nombreNivel:'',
    profesorId:0,
    vacantes:0,
    anioEscolar:0
  }
  matricula: Matricula ={
    alumnoID:0,
    cursoID:0,
    anioEscolar:0,
    estadoID:0,
    nivelID:0,
    matriculaID:0
  }

  @Input() postulantes: Alumno[] = [];  // Recibe los postulantes desde el padre
  @Output() actualizaPostulantes  = new EventEmitter<void>(); // Evento para pedir actualización de datos


  constructor(private alumnoService: AlumnoService,private route : ActivatedRoute, private cursoService: CursoService){}

  ngOnInit() {
    this.idCurso = this.route.snapshot.paramMap.get('id'); // Obtener cursoId desde la URL
    this.anio = this.route.snapshot.paramMap.get('anio'); // Obtener nivelId desde la URL

    if (this.idCurso) {
      this.obtenerDatos(); // Llamamos a una función para obtener el curso y los postulantes en paralelo
    }
  }

  obtenerDatos() {
    // Usamos forkJoin para realizar las peticiones en paralelo
    forkJoin({
      curso: this.cursoService.obtenerCursoPorId(parseInt(this.idCurso!, 10), this.anioSeleccionado),
      postulantes: this.cursoService.obtenerCursoPorId(parseInt(this.idCurso!, 10), this.anioSeleccionado).pipe(
        // Usamos el nivelId del curso obtenido dinámicamente para obtener los postulantes
        switchMap((cursoData) => {
          this.curso = cursoData; 
          return this.alumnoService.obtenerPostulantesPorNivelyAnio(cursoData.nivelId, this.anioSeleccionado);
        })
      ),
    }).subscribe({
      next: (result) => {
        this.curso = result.curso; 
        this.postulantes = result.postulantes; 
      },
      error: (err) => {
        console.error('Error en la obtención de datos:', err);
      },
    });
  }
    
  
    openModalInscripcion(postulante: Alumno) {
      this.selectedPostulante = postulante;
      this.isModalOpen = true;  
    }
  
    closeModalInscripcion() {
      this.isModalOpen = false;  // Cerrar el modal
    }
  
    confirmarInscripcion() {
      // Lógica para confirmar la inscripción
      console.log('Inscripción confirmada para', this.selectedPostulante);
   
     
     this.matricula.matriculaID = this.selectedPostulante.matricula.matriculaID;
     this.matricula.alumnoID = this.selectedPostulante.alumnoID;
     this.matricula.cursoID = this.curso.cursoId;
     this.matricula.anioEscolar = this.selectedPostulante.matricula.anioEscolar;
     this.matricula.nivelID = this.curso.nivelId;

      this.alumnoService.inscribirAlumno(this.matricula).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El Alumno inscrito correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
           
            this.actualizaPostulantes.emit(); // Ahora sí actualizará al padre

          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error?.message || 'Hubo un error al inscribir el alumno.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      });  



      // Cerrar el modal después de confirmar
      this.isModalOpen = false;
    }


    cargarAlumnos(): void {
      this.alumnoService.obtenerAlumnos().subscribe({
        next: (response) => {
          this.postulantes = response; 
        },
        error: (error) => {
          console.error('Error al cargar los alumnos:', error);
        }
      });
    }
}
