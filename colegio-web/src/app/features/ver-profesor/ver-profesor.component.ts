import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../modelo/profesor.modelo';
import { CommonModule } from '@angular/common';
interface Cursox {
  id: number;
  nombreCurso: string;
  nombreAsignatura: string;
  cantidadEstudiantes: number;
}

interface Estudiante {
  id: number;
  nombre: string;
  asistencia?: boolean;
  observacion?: string;
}

interface EstudianteN {
  id: number;
  nombre: string;
  notas: number[];
}

interface AsignaturaX {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-ver-profesor',
    standalone: true,
    imports: [FormsModule, RouterModule, CommonModule],
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
    puedeEditar = true; // Cambiar según el perfil del usuario


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

    fechaHoy = new Date().toISOString().split('T')[0]; // Fecha actual por defecto

    cursosx = signal<Cursox[]>([
      { id: 1, nombreCurso: 'Primero Medio A', nombreAsignatura: 'Matemáticas', cantidadEstudiantes: 30 },
      { id: 2, nombreCurso: 'Segundo Medio B', nombreAsignatura: 'Historia', cantidadEstudiantes: 25 }
    ]);

    asignaturas = signal<AsignaturaX[]>([
      { id: 101, nombre: 'Matemáticas' },
      { id: 102, nombre: 'Historia' }
    ]);
    estudiantes = signal<Estudiante[]>([]); // Se llenará dinámicamente

    estudiantesn = signal<EstudianteN[]>([]); // Se llenará dinámicamente
    contenidosNotas = signal<string[]>(['Prueba 1', 'Prueba 2', 'Prueba 3', 'Prueba 4', 'Prueba 5', 'Prueba 6', 'Prueba 7']); // Contenidos iniciales

    cambiarCurso(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const cursoId = Number(selectElement.value);
      console.log('Curso seleccionado:', cursoId);
  
      // Aquí podrías hacer una petición a la API para obtener los estudiantes del curso seleccionado
      if (cursoId === 1) {
        this.estudiantes.set([
          { id: 101, nombre: 'Juan Pérez' },
          { id: 102, nombre: 'María López' },
          { id: 103, nombre: 'Carlos Díaz' }
        ]);
      } else {
        this.estudiantes.set([
          { id: 201, nombre: 'Ana Torres' },
          { id: 202, nombre: 'Luis Fernández' }
        ]);
      }
    }
  
    cambiarFecha(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      console.log('Fecha seleccionada:', inputElement.value);
      // Aquí podrías hacer una petición para obtener asistencias previas del día seleccionado
    }
  
    marcarAsistencia(estudiante: Estudiante, presente: boolean) {
      if (this.puedeEditar) {
        this.estudiantes.update((lista) =>
          lista.map((e) =>
            e.id === estudiante.id ? { ...e, asistencia: presente } : e
          )
        );
        console.log(`Estudiante: ${estudiante.nombre}, Asistencia: ${presente ? 'Presente' : 'Ausente'}`);
      }
    }

    cursoSeleccionado = signal<number | null>(null);
    asignaturaSeleccionada = signal<number | null>(null);


  cambiarCursoNotas(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.cursoSeleccionado.set(Number(selectElement.value));
    console.log('Curso seleccionado para notas:', this.cursoSeleccionado());

    // Aquí podrías hacer una petición a la API para obtener los estudiantes del curso seleccionado
    this.cargarEstudiantes();
  }

  cambiarAsignaturaNotas(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.asignaturaSeleccionada.set(Number(selectElement.value));
    console.log('Asignatura seleccionada:', this.asignaturaSeleccionada());
  }

  cargarEstudiantes() {
    if (this.cursoSeleccionado() === 1) {
      this.estudiantesn.set([
        { id: 101, nombre: 'Juan Pérez', notas: [5.6, 6.0, 5.8, 6.2, 6.5, 0, 0] },
        { id: 102, nombre: 'María López', notas: [5.0, 4.8, 5.5, 6.0, 6.3, 0, 0] }
      ]);
    } else {
      this.estudiantesn.set([
        { id: 201, nombre: 'Ana Torres', notas: [6.2, 6.0, 5.9, 6.1, 6.4, 0, 0] },
        { id: 202, nombre: 'Luis Fernández', notas: [5.9, 5.5, 5.7, 6.1, 6.3, 0, 0] }
      ]);
    }
  }

  calcularPromedio(notas: number[]): string {
    const notasValidas = notas.filter(n => n > 0);
    if (notasValidas.length === 0) return '-'; // Si no hay notas, muestra '-'
    const promedio = notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length;
    return promedio.toFixed(1);
  }

  agregarNotaGeneral() {
    this.contenidosNotas.update((contenidos) => [...contenidos, `Nueva Nota ${contenidos.length + 1}`]);

    this.estudiantesn.update((estudiantes) =>
      estudiantes.map((estudiante) => ({
        ...estudiante,
        notas: [...estudiante.notas, 0] // Nueva nota vacía
      }))
    );

    console.log('Nueva nota agregada para todos los estudiantes.');
  }


  actualizarContenidoNota(index: number, nuevoContenido: string) {
    this.contenidosNotas.update((contenidos) => {
      const nuevaLista = [...contenidos]; // Clonamos el array
      nuevaLista[index] = nuevoContenido; // Modificamos el valor
      return nuevaLista; // Retornamos la nueva lista
    });
  }
  
}
