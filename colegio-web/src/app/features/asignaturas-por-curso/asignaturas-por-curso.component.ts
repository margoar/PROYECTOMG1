import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from '../../core/services/asignatura.service';
import { CursoAsignatura } from '../../modelo/cursoAsignatura.modelo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Asignatura } from '../../modelo/asignatura.modelo';
import { ProfesoresService } from '../../core/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas-por-curso',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './asignaturas-por-curso.component.html',
  styleUrl: './asignaturas-por-curso.component.css'
})
export class AsignaturasPorCursoComponent {
  id: string | null = null;
  cursoAsignaturas: CursoAsignatura[] = [];
  asignaturas: Asignatura[]  = [];
  cursos: any[] = [];
  profesores : any[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  asignaturaForm!: FormGroup;
  showForm = false;

  constructor(
      private route : ActivatedRoute,private asignaturaService: AsignaturaService,private fb: FormBuilder, private cdr: ChangeDetectorRef,
      private profesorService : ProfesoresService){    
      }

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL
      this.obtenerAsignaturasPorCursoId();
      this.cargarAsignaturas();
      this.cargarProfesores();
      this.inicializarFormulario();

    }


    inicializarFormulario() {
      this.asignaturaForm = this.fb.group({
        cursoId: this.id,
        asignaturaId: ['', Validators.required],
        profesorId: ['', Validators.required]
      });
    }
    showAddAsignaturaForm() {
      this.showForm = !this.showForm;
    }


    submitAsignaturaForm() {
      console.log(this.asignaturaForm);
      if (this.asignaturaForm.valid) {
        const nuevaAsignatura = this.asignaturaForm.value;
    
        this.asignaturaService.agregarAsignatura(nuevaAsignatura).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Éxito!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.asignaturaForm.reset(); // Resetea el formulario
              this.cargarAsignaturas();
            });
          },
          error: (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: error.error?.message || 'Hubo un error al agregar la asignatura.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }
        });
    
        this.showForm = false;
      }
    }
    


    obtenerAsignaturasPorCursoId() {
      const cursoId = this.id ? parseInt(this.id, 10) : 0;
  
      this.asignaturaService.obtenerAsignaturasPorCursoId(cursoId).subscribe({
        next: (data) => {
          console.log(data);
          this.cursoAsignaturas = data;
        },
        error: (err) => {
          console.error("Error obteniendo cursos:", err);
        }
      });
    }
    cargarAsignaturas() {
      this.asignaturaService.obtenerAsignaturas().subscribe({
        next: (data) => {
          console.log("asignaturas cargadas", data);
          this.asignaturas = data;
          this.cdr.detectChanges(); // Forzar la actualización de la vista
        },
        error: (err) => console.error("Error obteniendo asignaturas:", err)
      });
    }


    cargarProfesores() {
      this.profesorService.obtenerProfesores().subscribe({
        next: (data) => {
          this.profesores = data;
          this.cdr.detectChanges(); // Forzar la actualización de la vista
        },
        error: (err) => console.error("Error obteniendo asignaturas:", err)
      });
    }

}
