// app-routing.module.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfesoresComponent } from './features/profesores/profesores.component';
import { AlumnosComponent } from './features/alumnos/alumnos.component';
import { TableroComponent } from './features/tablero/tablero.component';
import { AuthGuard } from './core/guards/auth.guards';
import { EditarProfesorComponent } from './features/editar-profesor/editar-profesor.component';
import { EditarAlumnoComponent } from './features/editar-alumno/editar-alumno/editar-alumno.component';
import { VerProfesorComponent } from './features/ver-profesor/ver-profesor.component';
import { CursosPorNivelComponent } from './features/cursos-por-nivel/cursos-por-nivel.component';
import { DetalleCursoComponent } from './features/detalle-curso/detalle-curso.component';
import { DetalleAsignaturaComponent } from './features/detalle-asignatura/detalle-asignatura.component';
import { VerAlumnoComponent } from './features/ver-alumno/ver-alumno.component';
import { TableroInicioComponent } from './features/tablero-inicio/tablero-inicio.component';
import { CursosComponent } from './features/cursos/cursos.component';
import { AsignaturasComponent } from './features/asignaturas/asignaturas.component';
import { ConfiguracionesComponent } from './features/configuraciones/configuraciones.component';


export const routes: Routes = [
    {path: '', component: TableroComponent, canActivate :[AuthGuard],
      children:[
        {path: '', component: TableroInicioComponent, canActivate :[AuthGuard]},
        { path: 'profesores', component: ProfesoresComponent , canActivate :[AuthGuard]},
        { path: 'alumnos', component: AlumnosComponent, canActivate :[AuthGuard] },
        { path: 'cursos', component: CursosComponent, canActivate :[AuthGuard] },
        { path: 'asignaturas', component: AsignaturasComponent, canActivate :[AuthGuard] },
        { path: 'alumno/ver/:id', component: VerAlumnoComponent , canActivate :[AuthGuard]},
        { path: 'profesor/editar/:id', component: EditarProfesorComponent , canActivate :[AuthGuard]},
        { path: 'alumno/editar/:id', component: EditarAlumnoComponent , canActivate :[AuthGuard]},
        { path: 'profesor/ver/:id', component: VerProfesorComponent , canActivate :[AuthGuard]},
        { path: 'cursos/nivel/:id', component: CursosPorNivelComponent , canActivate :[AuthGuard]},
        { path: 'curso/:id/:anio', component: DetalleCursoComponent, canActivate :[AuthGuard] },
        { path: 'asignatura/:id/:anio', component: DetalleAsignaturaComponent, canActivate :[AuthGuard] },
        { path: 'configuraciones', component: ConfiguracionesComponent, canActivate :[AuthGuard] }

      ]
    }, //localhost:4200/
    { path: 'login', component: LoginComponent },


  { path: '**', redirectTo: '' },
];
