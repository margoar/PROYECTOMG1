import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Profesor } from '../../modelo/profesor.modelo';
import { ProfesoresService } from '../../core/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-profesor',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-profesor.component.html',
  styleUrl: './editar-profesor.component.css'
})
export class EditarProfesorComponent {
  profesor :Profesor = {
    nombre: '',
    email: '',
    password: '',
    rut: '',
    fechaNacimiento:  '',
    tipoContrato: 0
  }
  id: string | null = null;

    constructor(
      private profesorServicio :  ProfesoresService,
      private router: Router,
      private route : ActivatedRoute
    ){}

    ngOnInit(){
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id){
        this.profesorServicio.getProfesorPorId(this.id).subscribe((profesor: Profesor | null) =>{
          if(profesor){
            this.profesor = profesor;
          }else{
            this.router.navigate(['/']);
          }
        });
      }else{
        this.router.navigate(['/']);
      }
    }

    guardar(profesorForm: NgForm) {
      const { value, valid } = profesorForm;
    
      if (valid && this.id) {
        this.profesorServicio.modificarProfesor(Number(this.id), this.profesor)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Profesor actualizado!',
                text: 'Los cambios se guardaron correctamente.',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/']); 
              });
            }
          });
      } else {
        console.warn('Formulario no válido o ID no proporcionado');
      }
    }
    
    eliminar(){
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción deshabilitará al profesor.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed && this.id) {
          this.profesorServicio.eliminarProfesor(Number(this.id)).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Profesor eliminado!',
                text: 'El profesor ha sido deshabilitado correctamente.',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/']); 
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al deshabilitar el profesor. Inténtalo nuevamente.',
                confirmButtonText: 'OK'
              });
              console.error(err);
            }
          });
        }
      });
    }
}
