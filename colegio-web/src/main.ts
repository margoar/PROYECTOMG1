import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import {  HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule
import { provideHttpClient } from "@angular/common/http";

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/features/login/login.component';

import { JwtInterceptor } from './app//interceptors/jwrt.interceptor'; // Asegúrate de que la ruta sea correcta
import { HomeComponent } from './app/features/home/home.component';
import { ProfesoresComponent } from './app/features/profesores/profesores.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profesores', component: ProfesoresComponent },  // Ruta para profesores
  { path: '**', redirectTo: '/login' }, // Redirige cualquier ruta no válida a login


];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    [provideHttpClient()] ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // Agrega el interceptor

  ],
}).catch((err) => console.error(err));