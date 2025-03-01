import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../modelo/profesor.modelo';

@Component({
  selector: 'app-ver-profesor',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './ver-profesor.component.html',
    styleUrl: './ver-profesor.component.css'
})
export class VerProfesorComponent {
    profesor :Profesor = {
      rut: '',
      fechaNacimiento:  '',
      tipoContrato: '',
      telefono:'',
      nacionalidad:0,
      usuario :{
        nombres: '',
        apellidoPaterno:'',
        apellidoMaterno:'',
        email: '',
        passwordHash: ''
      }
    }
    id: string | null = null;
    cursos: any[] = [];


    constructor( private profesorServicio :  ProfesoresService, private router: Router, private route : ActivatedRoute){}
  
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

        this.cargarCursosPorProfesorId();
      }


      cargarCursosPorProfesorId() {
        const profesorId = this.id ? parseInt(this.id, 10) : 0;
        this.profesorServicio.getCursosPorProfesorId(profesorId).subscribe(data => {
          this.cursos = data;
        });
      }

}
