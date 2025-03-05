import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../modelo/profesor.modelo';
import Swal from 'sweetalert2';
import { Nacionalidad } from '../../modelo/nacionalidad.modelo';
import { TipoContrato } from '../../modelo/tipoContrato';


@Component({
  selector: 'app-profesores',
  standalone: true, // Esto es lo que hace que sea standalone
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent {
  pageProfesores: number = 1;
  // Número de profesores por página
  itemsPerPageProfesores: number = 7;

  profesores: Profesor[]  = [];
  profesor: Profesor = {
    rut: '',
    fechaNacimiento: '',
    tipoContrato: '',
    telefono:'',
    nacionalidad:0,
    genero:0,
    usuario :{
      email:'',
      passwordHash:'',
      nombres:'',
      apellidoPaterno:'',
      apellidoMaterno :''
    }
  };
  isPanelOpen: boolean  = false;
  isModalOpen: boolean = false;
  currentStep:number =1;
  
  nacionalidades: Nacionalidad[] | null = null;
  contratos: TipoContrato[] | null = null;


  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private profesoresService: ProfesoresService) {}

  ngOnInit(): void {
    this.cargarProfesores(); // Cargar los profesores al iniciar el componente
    this.getNaciconalidades();
    this.getTiposContratos();
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
    if(profesorForm.valid){
      //this.profesor.fechaNacimiento = new Date().toISOString();  // Formato ISO

      this.profesoresService.agregarProfesor(this.profesor).subscribe({
        next: (response) => {
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
          alert('Hubo un error al agregar el profesor.');
        }
      });      
    }
  }

  abrirModal() {
    this.isModalOpen = true;
  }
  

  getNaciconalidades(): void {
    this.profesoresService.obtenerNacionalidades().subscribe({
      next: (response) => {
        this.nacionalidades = response; 
      },
      error: (error) => {
        console.error('Error al cargar nacionalidades:', error);
      }
    });
  }


  getTiposContratos(): void {
    this.profesoresService.obtenerTiposContratos().subscribe({
      next: (response) => {
        this.contratos = response; 
      },
      error: (error) => {
        console.error('Error al cargar contratos:', error);
      }
    });
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
    return Math.ceil(this.profesores.length / this.itemsPerPageProfesores);
  }

  // Método para retroceder una página
  prevPageProfesores(): void {
    if (this.pageProfesores > 1) {
      this.pageProfesores--;
    }
  }

  // Método para avanzar una página
  nextPageProfesores(): void {
    if (this.pageProfesores < this.totalPages()) {
      this.pageProfesores++;
    }
  }

}
