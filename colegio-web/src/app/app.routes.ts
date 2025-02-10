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

export const routes: Routes = [
    {path: '', component: TableroComponent, canActivate :[AuthGuard]}, //localhost:4200/
    { path: 'login', component: LoginComponent },
    { path: 'profesores', component: ProfesoresComponent , canActivate :[AuthGuard]},
    { path: 'profesor/editar/:id', component: EditarProfesorComponent , canActivate :[AuthGuard]},
    { path: 'alumno/editar/:id', component: EditarAlumnoComponent , canActivate :[AuthGuard]},
    { path: 'profesor/ver/:id', component: VerProfesorComponent , canActivate :[AuthGuard]},
    { path: 'alumnos', component: AlumnosComponent, canActivate :[AuthGuard] },
  { path: '**', redirectTo: '' },
];
