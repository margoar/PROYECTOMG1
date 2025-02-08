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
            console.log('Cliente no encontrado: ' +this.id);
            this.router.navigate(['/']);
          }
        });
      }else{
        console.log('ID no proporcionado');
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
      throw new Error('metodo no implementado');
    }
}
