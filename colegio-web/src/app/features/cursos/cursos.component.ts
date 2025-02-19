import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nivel } from '../../modelo/nivel.modelo';
import { CursoService } from '../../core/services/curso.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../modelo/profesor.modelo';
import Swal from 'sweetalert2';
import { Curso } from '../../modelo/curso.modelo';

@Component({
  selector: 'app-cursos',
  standalone: true, 
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
niveles: Nivel[] | null = null;
nivel: Nivel = {
  descripcion: 'rere'
  };
  profesores: Profesor[] | null = null;
  profesor: Profesor = {
    rut: '',
    fechaNacimiento: '',
    tipoContrato: 1,
    telefono:'',
    nacionalidad:0,
    usuario: {
      nombres: '',
      apellidoPaterno:'',
      apellidoMaterno:'',
      email: '',
      passwordHash: ''
    }
  };

  curso:Curso = {
    nivelId:0,
    cursoId:0,
    nombreCurso:'',
    nombreNivel:'',
    profesorId:0,
    vacantes:0,
  }

  isPanelOpen: boolean  = false;
  isModalOpen: boolean = false;
  
  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

constructor(private cursoService: CursoService, private profesorService:ProfesoresService) {}

  ngOnInit(): void {
    this.cargarNiveles(); 
    this.cargarProfesores();

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
  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (response) => {
        this.profesores = response;
      },
      error: (error) => {
        console.error('Error al cargar profesores:', error);
      }
    });
  }

  agregar(cursoForm: NgForm) {
    const {value, valid} = cursoForm;
    console.log(value);
    if(valid){

      this.cursoService.agregarCurso(value).subscribe({
        next: (response) => {
          console.log("Curso agregado exitosamente:", response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'Curso agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            cursoForm.resetForm(); 
            this.cerrarModal(); 
          });
        },
        error: (error) => {
          console.error("Error al agregar curso:", error);
          alert('Hubo un error al agregar curso.');
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
  
}

