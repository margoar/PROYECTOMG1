import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Alumno } from '../../modelo/alumno.modelo';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../core/services/alumno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-inscritos',
  imports: [CommonModule],
  templateUrl: './listado-inscritos.component.html',
  styleUrl: './listado-inscritos.component.css'
})
export class ListadoInscritosComponent  implements OnInit{
  @Input() cursoId!: number; 
  inscritos: Alumno[] = [];
  anioEscolar : number =0;
  idCurso: string | null = null;
  page = 1; // Página actual

  constructor(private alumnoService: AlumnoService, private route : ActivatedRoute) {}


  
  ngOnInit() :void {
    this.route.paramMap.subscribe(params => {
      this.idCurso = params.get('id')!;
      this.anioEscolar = parseInt(params.get('anio')!, 10);
      this.cargarInscritos();  // Vuelve a cargar los inscritos cuando cambian los parámetros
    });
  }

  cargarInscritos() {
    this.alumnoService.obtenerInscritosPorCursoYAnio(parseInt(this.idCurso!,10) , this.anioEscolar).subscribe(data => {

      this.inscritos = data;
    });
  }
  actualizarInscritos() {
    this.cargarInscritos();  // Vuelve a cargar la lista de inscritos
  }  
}
