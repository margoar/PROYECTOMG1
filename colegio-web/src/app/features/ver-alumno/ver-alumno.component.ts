import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alumno } from '../../modelo/alumno.modelo';
import { AlumnoService } from '../../core/services/alumno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-alumno',
  standalone : true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './ver-alumno.component.html',
  styleUrl: './ver-alumno.component.css'
})
export class VerAlumnoComponent {
  alumno :Alumno = {
    nombreAlumno: '',
    rut: '',
    fechaNacimiento:  '',
    genero: '',
    telefono:'',
    direccion:'',
    estadoEstudiante:'',
   apoderado:{
    usuario:{}
   },
   matricula : {
    anioEscolar:0
   }
  }
  apoderado : any = [];
  id: string | null = null;

  constructor( private alumnoService :  AlumnoService, private router: Router, private route : ActivatedRoute){}
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.alumnoService.getAlumnoPorId(this.id).subscribe((alumno: Alumno | null) =>{
      if(alumno){
        this.alumno = alumno;
        }else{
          this.router.navigate(['/']);
        }
      });

      this.getInfoApoderado(this.id);
    }else{
      this.router.navigate(['/']);
    }
 
  }

  getInfoApoderado(id : string ){
    this.alumnoService.getApoderadoPorAlumnoid(id).subscribe((apoderado: any | null) =>{
      if(apoderado){
        this.apoderado = apoderado;
        console.log(this.apoderado)
        }else{
          this.router.navigate(['/']);
        }
      });

  }

  pagarMatricula() {
    if (this.id) {  // Comprobamos si id no es null
      this.alumnoService.pagarMatricula(this.id).subscribe(
        response => {
          console.log('Matrícula pagada con éxito:', response);
          // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página
        },
        error => {
          console.error('Error al pagar matrícula:', error);
          // Aquí puedes mostrar un mensaje de error si algo salió mal
        }
      );
    } else {
      console.error('ID del alumno no encontrado');
      // Puedes mostrar un mensaje al usuario indicando que no se puede procesar la matrícula sin un ID
    }
  }


}
