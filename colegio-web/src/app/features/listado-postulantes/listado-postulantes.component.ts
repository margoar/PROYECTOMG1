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

  postulantes: Alumno[] = [];
  @Input() nivelId!: number; // Recibe el valor del padre

  @Output() postulanteAgregado: EventEmitter<void> = new EventEmitter();



  constructor(private alumnoService: AlumnoService,private route : ActivatedRoute, private cursoService: CursoService){}

  ngOnInit() {
    this.idCurso = this.route.snapshot.paramMap.get('id'); // Obtener cursoId desde la URL
    this.anio = this.route.snapshot.paramMap.get('anio'); // Obtener nivelId desde la URL
    this.cargarPostulantes(); 


  }

    
  cargarPostulantes() {
    this.alumnoService.obtenerPostulantesPorNivelyAnio(this.nivelId, this.anioSeleccionado).subscribe(data => {
      this.postulantes = data;
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
    console.log('Inscripción confirmada para', this.selectedPostulante);
   
     
     this.matricula.matriculaID = this.selectedPostulante.matricula.matriculaID;
     this.matricula.alumnoID = this.selectedPostulante.alumnoID;
     this.matricula.cursoID = this.idCurso ? parseInt(this.idCurso, 10) : undefined;
     this.matricula.anioEscolar = this.selectedPostulante.matricula.anioEscolar;
     this.matricula.nivelID = this.nivelId;

      this.alumnoService.inscribirAlumno(this.matricula).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El Alumno inscrito correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.cargarPostulantes();
            this.postulanteAgregado.emit(); 
           
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


    agregarPostulante(postulante: Alumno) {
      this.alumnoService.agregarAlumno(postulante).subscribe(() => {
        this.actualizarInscritos();  // Llamamos para actualizar los inscritos
      });
    }
  
    actualizarInscritos() {
      // Usamos el servicio de inscritos para actualizar la lista
      // Puedes llamar al método del componente padre o refrescar directamente aquí
      console.log("Postulante agregado. Actualizando lista de inscritos.");
    }
}
