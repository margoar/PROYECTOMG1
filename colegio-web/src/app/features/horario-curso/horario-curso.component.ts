import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorarioCursoService } from '../../core/services/horarioCurso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario-curso',
  imports: [CommonModule],
  templateUrl: './horario-curso.component.html',
  styleUrl: './horario-curso.component.css'
})
export class HorarioCursoComponent {

 id: string | null = null;
  diasSemana: string[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  cursos: any[] = [];
  horario: any[] = []; // Para almacenar el horario procesado
  
  horarios: any = {}; // Aquí se almacenarán los horarios agrupados por día

  constructor(
      private route : ActivatedRoute,private horarioService: HorarioCursoService){}

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL
      this.cargarSemana();
      if (this.id) {
        this.cargarHorario(this.id);
      }
    }

    cargarSemana() {
    this.horarioService.semana().subscribe({
      next: (data) => {
        this.diasSemana = data.map(item => item.descripcion);
      },
      error: (err) => {
        console.error("Error obteniendo semana:", err);
      }
    });
  }

  cargarHorario(cursoId: string) {
    this.horarioService.obtenerHorarioPorCursoId(parseInt(cursoId!, 10)).subscribe({
      next: (data) => {
        console.log(data); // Ver la estructura de los datos
        this.procesarHorario(data);
      },
      error: (err) => {
        console.error("Error obteniendo horario:", err);
      }
    });
  }


  procesarHorario(data: any[]) {
    const horariosAgrupados: any = {
      "Lunes": [],
      "Martes": [],
      "Miércoles": [],
      "Jueves": [],
      "Viernes": []
    };
  
    data.forEach(item => {


      const horario = {
        tipo: item.tipo,
        nombreAsignatura: item.nombreAsignatura,
        horaInicio: this.formatearHora(item.horaInicio),
        horaFin: this.formatearHora(item.horaFin),
        colorAsignatura: item.colorAsignatura
      };
  
      // Agrupar las asignaturas por día de la semana
      horariosAgrupados[item.diaSemana].push(horario);
    });
  
    this.horarios = horariosAgrupados;
  }
  
  formatearHora(hora: string): string {
    if (!hora) return ''; // Evita errores si la hora viene vacía
    const [horaInicio, minutoInicio] = hora.split(':');
    return `${horaInicio}:${minutoInicio}`;
  }
  

}
