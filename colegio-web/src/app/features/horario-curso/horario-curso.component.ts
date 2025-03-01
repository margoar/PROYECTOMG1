import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorarioCursoService } from '../../core/services/horarioCurso.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { HorarioCurso } from '../../modelo/horarioCurso.modelo';

@Component({
  selector: 'app-horario-curso',
  imports: [CommonModule,DragDropModule],
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
  tramos: any[] = [];
  tramosCurso?: any[] = [];
  asignaturas: any[] = [];


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

agregarTramo(){
  console.log("agregando tramo")
}

  onDrop(event: CdkDragDrop<any>, diaDestino: string, indexDestino: number) {
    // Lógica para mover la asignatura entre celdas
    // Por ejemplo:
    const asignatura = this.tramos[indexDestino].asignaturas[diaDestino];
    // Realiza aquí la lógica de intercambio o reubicación
    // Ejemplo simple (ajusta según tu lógica):
    this.tramos[indexDestino].asignaturas[diaDestino] = event.item.data;
  }
  cargarHorario(cursoId: string) {
    this.horarioService.obtenerHorarioPorCursoId(parseInt(cursoId!, 10)).subscribe({
      next: (data) => {
        this.procesarHorario(data);
        // Crear el arreglo `tramosCurso`
             this.tramosCurso = data.map((item :HorarioCurso) => ({
              tramoHorarioId: item.tramoHorarioId,
              horaInicio: this.formatearHora(item.horaInicio),
              horaFin: this.formatearHora(item.horaFin),
              asignaturas: {} // Inicializa como un objeto vacío
            }));

      },
      error: (err) => {
        console.error("Error obteniendo horario:", err);
      }
    });
  }



  
    // Eliminar asignatura de un tramo
    eliminarAsignatura(dia: string, tramo: any) {
      delete tramo.asignaturas[dia];
    }

    editarCelda(dia: string, tramo: any) {
      const nuevaAsignatura = prompt("Ingrese el nombre de la asignatura:");
      const colorAsignatura = prompt("Ingrese el color de la asignatura:");
    
      if (nuevaAsignatura && colorAsignatura) {
        tramo.asignaturas[dia] = { nombre: nuevaAsignatura, color: colorAsignatura };
      }
    }
    
    // Función para agregar asignaturas si no hay ninguna asignada
    agregarAsignatura(dia: string, tramo: any) {
      const nuevaAsignatura = prompt("Ingrese el nombre de la asignatura:");
      const colorAsignatura = prompt("Ingrese el color de la asignatura:");
    
      if (nuevaAsignatura && colorAsignatura) {
        tramo.asignaturas[dia] = { nombre: nuevaAsignatura, color: colorAsignatura };
      }
    }

    confirmarCambios() {
      console.log('Cambios confirmados:', this.tramos);
      // Aquí se enviaría la información al backend
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
