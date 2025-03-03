import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alumno } from '../../modelo/alumno.modelo';
import { AlumnoService } from '../../core/services/alumno.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Curso } from '../../modelo/curso.modelo';
import { HorarioCurso } from '../../modelo/horarioCurso.modelo';

interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  asignatura: string;
  asistencia?: boolean;
  observacion?: string;
}


interface Materia {
  nombre: string;
  notas: number[];
}

@Component({
  selector: 'app-ver-alumno',
  standalone : true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './ver-alumno.component.html',
  styleUrl: './ver-alumno.component.css'
})
export class VerAlumnoComponent implements AfterViewInit{

  fechaSeleccionada = new Date().toISOString().split('T')[0]; // Inicializa con la fecha actual
  puedeEditar = true; // Cambiar según el perfil del usuario
  fechaHoy = new Date().toISOString().split('T')[0]; 

  anioSeleccionado = new Date().getFullYear(); // Año por defecto: año actual
  aniosDisponibles = Array.from({ length: 5 }, (_, i) => this.anioSeleccionado - i); // Últimos 5 años



  horarios = signal<Horario[]>([
    { diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '09:30', asignatura: 'Matemáticas' },
    { diaSemana: 'Lunes', horaInicio: '09:45', horaFin: '11:15', asignatura: 'Historia' },
    { diaSemana: 'Lunes', horaInicio: '11:30', horaFin: '13:00', asignatura: 'Ciencias' },
    { diaSemana: 'Lunes', horaInicio: '14:00', horaFin: '15:30', asignatura: 'Lenguaje' }
  ]);

  materias = signal<Materia[]>([
    { nombre: 'Matemáticas', notas: [5.6, 6.0, 5.8, 6.2, 6.5, 0, 0] },
    { nombre: 'Historia', notas: [5.0, 4.8, 5.5, 6.0, 6.3, 0, 0] },
    { nombre: 'Ciencias', notas: [6.2, 6.0, 5.9, 6.1, 6.4, 0, 0] },
    { nombre: 'Lenguaje', notas: [5.9, 5.5, 5.7, 6.1, 6.3, 0, 0] }
  ]);


  alumno :Alumno = {
    nombreAlumno: '',
    rut: '',
    fechaNacimiento:  '',
    genero: '',
    telefono:'',
    direccion:'',
    estadoEstudiante:'',
   apoderado:{
    usuario:{
      email: ''
    }
   },
   matricula : {
    anioEscolar:0
   }
  }
  curso:Curso = {
    cursoId: 0,
    nivelId: 0,
    nombreCurso: '',
    nombreNivel: '',
    profesorId: 0,
    profesorJefe: '',  // Agregado
    inscritos: 0,  // Agregado
    disponibilidad: 0
  }
  apoderado : any = [];
  id: string | null = null;
  @ViewChild('asistenciaChart') asistenciaChart: any;
  @ViewChild('notasChart') notasChart: any;
  



  ngAfterViewInit() {
    this.renderAsistenciaChart();
    this.renderNotasChart();
  }

  constructor( private alumnoService :  AlumnoService, private router: Router, private route : ActivatedRoute){
    Chart.register(...registerables, ChartDataLabels);
  }
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id){    
      this.getInfoAlumno(this.id);
      this.getInfoApoderado(this.id);
      this.obtenerCursoPorAlumnoId();

    }else{
      this.router.navigate(['/']);
    }
 
  }


  renderAsistenciaChart() {
    new Chart(this.asistenciaChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Asistencias', 'Inasistencias'],
        datasets: [{
          data: [80, 20], // Datos brutos
          backgroundColor: ['#0d6efd', '#dc3545']
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value: any, context: any) => {
              let total = context.chart.data.datasets[0].data
                .map((num: any) => Number(num)) // Ensure all values are numbers
                .reduce((a: number, b: number) => a + b, 0); // Explicitly type 'a' and 'b'
            
              let percentage = ((Number(value) / total) * 100).toFixed(1) + "%"; // Convert value to number
              return percentage;
            }
            
          }
        }
      }
    });
  }

  renderNotasChart() {
    new Chart(this.notasChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Matemáticas', 'Historia', 'Quimica','Lenguaje','Biologia','Ingles'],
        datasets: [{
          label: 'Notas',
          data: [6.2, 5.8, 6.0,3.4,6.0,4.5],
          backgroundColor: '#0d6efd'
        }]
      }
    });
  }
  getInfoAlumno(id : string ){
    this.alumnoService.getAlumnoPorId(id).subscribe((alumno: Alumno  | null) =>{
      if(alumno){
        this.alumno = alumno;
        }else{
          this.router.navigate(['/']);
        }
      });
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

      this.getInfoAlumno(this.id);
    } else {
      console.error('ID del alumno no encontrado');
      // Puedes mostrar un mensaje al usuario indicando que no se puede procesar la matrícula sin un ID
    }
  }

  obtenerCursoPorAlumnoId() {
    const alumnoId = this.id ? parseInt(this.id, 10) : 0;
    const anioMatricula = 2025;
        
    this.alumnoService.obtenerCursoPorAlumnoId(alumnoId, anioMatricula).subscribe({
      next: (data) => {
        console.log("Curso recibido:", data);
        this.curso = data;
      },
      error: (err) => {
        console.error("Error obteniendo curso:", err);
      }
    });
    
  }
  
  
  marcarAsistencia(horario: Horario, presente: boolean) {
    horario.asistencia = presente;
    console.log(`Asignatura: ${horario.asignatura}, Asistencia: ${presente ? 'Presente' : 'Ausente'}`);
  }

cambiarFecha(event: Event) {
  const input = event.target as HTMLInputElement; // 🔹 Convertimos event.target en un input
  this.fechaSeleccionada = input.value;
  console.log("Fecha seleccionada:", this.fechaSeleccionada);
}
cambiarAnio(event: Event) {
  const input = event.target as HTMLSelectElement;
  this.anioSeleccionado = Number(input.value);
  console.log("Año seleccionado:", this.anioSeleccionado);

  // Aquí podrías hacer una petición para obtener notas del año seleccionado desde la API
}

calcularPromedio(notas: number[]): string {
  const notasValidas = notas.filter(n => n > 0);
  if (notasValidas.length === 0) return '-'; // Si no hay notas, muestra '-'
  const promedio = notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length;
  return promedio.toFixed(1);
}
  
}
