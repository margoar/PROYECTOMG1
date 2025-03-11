import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../core/services/configuracion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  Math = Math;

  categorias: { titulo: string; modal: string; pagina: number; lista: { id: number; nombre: string }[] }[] = [
    { titulo: 'Géneros', modal: 'modalGenero', pagina: 1, lista: [] },
    { titulo: 'Parentesco', modal: 'modalParentesco', pagina: 1, lista: [] },
    { titulo: 'Tipos de Contrato', modal: 'modalContrato', pagina: 1, lista: [] },
    { titulo: 'Nacionalidades', modal: 'modalNacionalidad', pagina: 1, lista: [] },
    { titulo: 'Niveles', modal: 'modalNivel', pagina: 1, lista: [] }
  ];
  categoriaSeleccionada: any = null;
  formulario: FormGroup;

  constructor(private configuracionService: ConfiguracionService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.configuracionService.obtenerNiveles().subscribe(data => {
      console.log('Datos recibidos de obtenerNiveles:', data); // Verifica qué datos llegan
      this.categorias.find(cat => cat.titulo === 'Niveles')!.lista = data.map(n => ({
        id: n.nivelId ?? 0, // Si id es undefined, asignamos 0
        nombre: n.descripcion ?? 'Sin nombre' // Si nombre es undefined, asignamos un texto por defecto
      }));
      console.log('Categorías después de asignar:', this.categorias);
    });
    
  
    this.configuracionService.obtenerGeneros().subscribe(data => {
      this.categorias.find(cat => cat.titulo === 'Géneros')!.lista = data.map(g => ({
        id: g.id ?? 0,
        nombre: g.nombre ?? 'Sin nombre'
      }));
    });
  
    this.configuracionService.obtenerParentescos().subscribe(data => {
      this.categorias.find(cat => cat.titulo === 'Parentesco')!.lista = data.map(p => ({
        id: p.parentescoId ?? 0,
        nombre: p.tipoParentesco ?? 'Sin nombre'
      }));
    });
  
    this.configuracionService.obtenerTiposContratos().subscribe(data => {
      this.categorias.find(cat => cat.titulo === 'Tipos de Contrato')!.lista = data.map(tc => ({
        id: tc.id ?? 0,
        nombre: tc.nombre ?? 'Sin nombre'
      }));
    });
  
    this.configuracionService.obtenerNacionalidades().subscribe(data => {
      this.categorias.find(cat => cat.titulo === 'Nacionalidades')!.lista = data.map(n => ({
        id: n.id ?? 0,
        nombre: n.nombre ?? 'Sin nombre'
      }));
    });
  }
  

  eliminarElemento(lista: any[], id: number) {
    const index = lista.findIndex(item => item.id === id);
    if (index !== -1) {
      lista.splice(index, 1);
    }
  }

  seleccionarCategoria(categoria: any) {
    this.categoriaSeleccionada = categoria;
    this.formulario.reset();
  }


  agregarElementoModal() {
    if (this.formulario.valid && this.categoriaSeleccionada) {
      const descripcion = this.formulario.value.nombre;
      const categoria = this.categoriaSeleccionada.titulo;
       console.log("descripocion");
       console.log(descripcion);
       console.log("categopria")
       console.log(categoria);
      this.configuracionService.insertarElemento(categoria, descripcion).subscribe(
        (nuevoId) => {
          // Agregar el nuevo elemento a la lista con el ID devuelto por el backend
          this.categoriaSeleccionada.lista.push({ id: nuevoId, nombre: descripcion });
  
          // Cerrar el modal
          this.cerrarModal();
  
          // Mostrar SweetAlert con el tipo de categoría correcta
          Swal.fire({
            title: `¡${categoria} agregado!`,
            text: `Se agregó "${descripcion}" a la categoría "${categoria}" correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        (error) => {
          console.error(`Error al insertar en la categoría ${categoria}:`, error);
  
          // Mostrar SweetAlert de error con el tipo de categoría correcta
          Swal.fire({
            title: `Error al agregar ${categoria}`,
            text: 'Hubo un problema al agregar el elemento.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
  

  cerrarModal() {
    (document.getElementById('modalAgregar') as any)?.classList.remove('show');
    document.body.classList.remove('modal-open');
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (backdrop) {
      backdrop.remove();
    }
  }
  
  
}