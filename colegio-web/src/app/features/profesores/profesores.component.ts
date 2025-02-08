import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../modelo/profesor.modelo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent {
  profesores: Profesor[] | null = null;
  profesor: Profesor = {
    nombre: '',
    email: '',
    password: '',
    rut: '',
    fechaNacimiento: '',
    tipoContrato: 1
  };
  isPanelOpen: boolean  = false;
  isModalOpen: boolean = false;


  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private profesoresService: ProfesoresService) {}

  ngOnInit(): void {
    this.cargarProfesores(); // Cargar los profesores al iniciar el componente

  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  cargarProfesores(): void {
    this.profesoresService.obtenerProfesores().subscribe({
      next: (response) => {
        this.profesores = response; 
      },
      error: (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    });
  }

  agregar(profesorForm: NgForm) {
    const {value, valid} = profesorForm;
    if(valid){
      this.profesor.fechaNacimiento = new Date().toISOString();  // Formato ISO

      this.profesoresService.agregarProfesor(value).subscribe({
        next: (response) => {
          console.log("Profesor agregado exitosamente:", response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'El profesor ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.cargarProfesores();
            profesorForm.resetForm(); 
            this.cerrarModal(); 
          });
        },
        error: (error) => {
          console.error("Error al agregar el profesor:", error);
          alert('Hubo un error al agregar el profesor.');
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
