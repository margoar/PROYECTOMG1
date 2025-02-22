import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alumno } from '../../modelo/alumno.modelo';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../core/services/alumno.service';

@Component({
  selector: 'app-listado-inscritos',
  imports: [],
  templateUrl: './listado-inscritos.component.html',
  styleUrl: './listado-inscritos.component.css'
})
export class ListadoInscritosComponent implements OnChanges {
  @Input() cursoId!: number; 
  inscritos: Alumno[] = [];
  anioEscolar : number =0;
  constructor(private alumnoService: AlumnoService, private route : ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cursoId'] && changes['cursoId'].currentValue !== 0) {
      console.log('Nuevo cursoId en el hijo:', changes['cursoId'].currentValue);
    }
    this.anioEscolar = parseInt(this.route.snapshot.paramMap.get('anio')!, 10);
    console.log(this.anioEscolar);
    this.cargarInscritos();
  }

  cargarInscritos() {
    this.alumnoService.obtenerInscritosPorCursoYAnio(this.cursoId , this.anioEscolar).subscribe(data => {
      this.inscritos = data;
    });
  }

}
