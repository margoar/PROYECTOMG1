import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Alumno } from '../../modelo/alumno.modelo';
import { AlumnoService } from '../../core/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
    alumnos: Alumno[] | null = null;
    alumno: Alumno = {
      nombre: '',
      email: '',
      password: '',
      rut: '',
      fechaNacimiento: ''
    };
    isPanelOpen: boolean  = false;
    isModalOpen: boolean = false;

    @ViewChild('botonCerrar') botonCerrar!: ElementRef;
    
  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarAlumnos(); 

  }


  cargarAlumnos(): void {
    this.alumnoService.obtenerAlumno().subscribe({
      next: (response) => {
        this.alumnos = response; 
      },
      error: (error) => {
        console.error('Error al cargar los alumnos:', error);
      }
    });
  }

  agregar(alumnoForm: NgForm) {
    const {value, valid} = alumnoForm;
    if(valid){
      this.alumno.fechaNacimiento = new Date().toISOString();  // Formato ISO

      this.alumnoService.agregarAlumno(value).subscribe({
        next: (response) => {
          console.log("Alumno agregado exitosamente:", response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'El Alumno ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.cargarAlumnos();
            alumnoForm.resetForm(); 
            this.cerrarModal(); 
          });
        },
        error: (error) => {
          console.error("Error al agregar el alumno:", error);
          alert('Hubo un error al agregar el alumno.');
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
