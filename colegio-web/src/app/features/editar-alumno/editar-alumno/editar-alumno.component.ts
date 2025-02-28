import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Alumno } from '../../../modelo/alumno.modelo';
import { AlumnoService } from '../../../core/services/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-alumno.component.html',
  styleUrl: './editar-alumno.component.css'
})
export class EditarAlumnoComponent {
  alumno :Alumno = {
    nombreAlumno: '',
    rut: '',
    fechaNacimiento:  '',
    genero: '',
    telefono:'',
    direccion:'',
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
      }
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
      anioEscolar:0,
      asignaturas: [],  
      alumnos: [],  
    }
    ,
      matricula :{
        anioEscolar : 0
      }

  }
  id: string | null = null;

    constructor(
      private alumnoServicio :  AlumnoService,
      private router: Router,
      private route : ActivatedRoute
    ){}

    ngOnInit(){
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id){
        this.alumnoServicio.getAlumnoPorId(this.id).subscribe((alumno: Alumno | null) =>{
          if(alumno){
            this.alumno = alumno;
          }else{
            this.router.navigate(['/']);
          }
        });
      }else{
        this.router.navigate(['/']);
      }
    }

    guardar(alumnoForm: NgForm) {
      const { value, valid } = alumnoForm;
    
      if (valid && this.id) {
        this.alumnoServicio.modificarAlumno(Number(this.id), this.alumno)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Alumno actualizado!',
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
        text: 'Esta acción deshabilitará al alumno.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed && this.id) {
          this.alumnoServicio.eliminarAlumno(Number(this.id)).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Alumno eliminado!',
                text: 'El alumno ha sido deshabilitado correctamente.',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/']); 
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al deshabilitar el alumno. Inténtalo nuevamente.',
                confirmButtonText: 'OK'
              });
              console.error(err);
            }
          });
        }
      });
    }
}
