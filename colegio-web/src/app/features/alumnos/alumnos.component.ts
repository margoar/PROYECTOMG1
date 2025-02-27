import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Alumno } from '../../modelo/alumno.modelo';
import { AlumnoService } from '../../core/services/alumno.service';
import Swal from 'sweetalert2';
import { Nivel } from '../../modelo/nivel.modelo';
import { CursoService } from '../../core/services/curso.service';

@Component({
  selector: 'app-alumnos',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  pageAlumnos: number = 1;
  // Número de alumnos por página
  itemsPerPageAlumnos: number = 5;

    alumnos: Alumno[] = []
    alumno: Alumno = {
      nombres: '',
      apellidoPaterno:'',
      apellidoMaterno:'',
      rut: '',
      fechaNacimiento: '',
      estadoEstudiante:'',
      apoderado: {
        rut:'',
        telefono:'',
        direccion:'',
        usuario: {
          email:'',
          passwordHash:'',
          nombres:'',
          apellidoPaterno:'',
          apellidoMaterno :''
        },

      },
      matricula:{
        alumnoID:0,
        cursoID:0,
        anioEscolar:0,
        estadoID:0,
        nivelID:0,
      },
      curso : {
        cursoId: 0,
        nivelId: 0,
        nombreNivel: '',
        nombreCurso: '',
        profesorId: 0,
        profesorJefe: '',
        inscritos: 0,
        disponibilidad: 0,
        vacantes: 0,
        asignaturas: [],  
        alumnos: [],  
      }
      
    };

    niveles: Nivel[] | null = null;
    nivel: Nivel = {
      descripcion: 'rere'
      };
    isPanelOpen: boolean  = false;
    isModalOpen: boolean = false;
    currentStep:number =1;

    @ViewChild('botonCerrar') botonCerrar!: ElementRef;
    @ViewChild('alumnoForm') alumnoForm!: NgForm;

  constructor(private alumnoService: AlumnoService, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarAlumnos(); 
    this.cargarNiveles(); 

  }
  cargarNiveles(): void {
    this.cursoService.obtenerNiveles().subscribe({
      next: (response) => {
        this.niveles = response; 
      },
      error: (error) => {
        console.error('Error al cargar niveles:', error);
      }
    });
  }


  cargarAlumnos(): void {
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (response) => {
        this.alumnos = response; 
      },
      error: (error) => {
        console.error('Error al cargar los alumnos:', error);
      }
    });
  }

  agregar(alumnoForm: NgForm) {
    if(alumnoForm.valid){

      this.alumnoService.agregarAlumno(this.alumno).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El Alumno ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            alumnoForm.resetForm(); // Resetea el formulario

            this.cargarAlumnos();
            this.cerrarModal(); 
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error?.message || 'Hubo un error al agregar el alumno.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      });      
    }
  }
  abrirModal() {
    this.isModalOpen = true;
  }
  
   cerrarModal(){
    this.isModalOpen = false;
    this.botonCerrar.nativeElement.click();
  }
  setStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
      if (this.currentStep < 3) {
          this.currentStep++;
      }
  }

  prevStep() {
      if (this.currentStep > 1) {
          this.currentStep--;
      }
  }
   // Calcula el total de páginas
   totalPages(): number {
    return Math.ceil(this.alumnos.length / this.itemsPerPageAlumnos);
  }

  // Método para retroceder una página
  prevPageAlumnos(): void {
    if (this.pageAlumnos > 1) {
      this.pageAlumnos--;
    }
  }

  // Método para avanzar una página
  nextPageAlumnos(): void {
    if (this.pageAlumnos < this.totalPages()) {
      this.pageAlumnos++;
    }
  }

}
