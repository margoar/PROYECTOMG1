import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent {
  Math = Math;

  categorias = [
    {
      titulo: 'Géneros',
      modal: 'modalGenero',
      pagina: 1,
      lista: [
        { id: 1, nombre: 'Masculino' },
        { id: 2, nombre: 'Femenino' },
        { id: 3, nombre: 'No Binario' },
        { id: 4, nombre: 'Otro' }
      ]
    },
    {
      titulo: 'Parentesco',
      modal: 'modalParentesco',
      pagina: 1,
      lista: [
        { id: 1, nombre: 'Padre' },
        { id: 2, nombre: 'Madre' },
        { id: 3, nombre: 'Hermano/a' },
        { id: 4, nombre: 'Tutor' }
      ]
    },
    {
      titulo: 'Tipos de Contrato',
      modal: 'modalContrato',
      pagina: 1,
      lista: [
        { id: 1, nombre: 'Tiempo Completo' },
        { id: 2, nombre: 'Medio Tiempo' },
        { id: 3, nombre: 'Honorarios' },
        { id: 4, nombre: 'Freelance' }
      ]
    },
    {
      titulo: 'Nacionalidades',
      modal: 'modalNacionalidad',
      pagina: 1,
      lista: [
        { id: 1, nombre: 'Chilena' },
        { id: 2, nombre: 'Argentina' },
        { id: 3, nombre: 'Peruana' },
        { id: 4, nombre: 'Mexicana' }
      ]
    },
    {
      titulo: 'Niveles',
      modal: 'modalNivel',
      pagina: 1,
      lista: [
        { id: 1, nombre: 'Preescolar' },
        { id: 2, nombre: 'Primaria' },
        { id: 3, nombre: 'Secundaria' },
        { id: 4, nombre: 'Universitario' }
      ]
    }
  ];

  eliminarElemento(lista: any[], id: number) {
    const index = lista.findIndex(item => item.id === id);
    if (index !== -1) {
      lista.splice(index, 1);
    }
  }

  agregarElemento(lista: any[], nuevoNombre: string) {
    if (nuevoNombre.trim() !== '') {
      const nuevoElemento = { id: lista.length + 1, nombre: nuevoNombre };
      lista.push(nuevoElemento);
    }
  }
}