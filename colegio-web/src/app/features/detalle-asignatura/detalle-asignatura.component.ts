import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-asignatura',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detalle-asignatura.component.html',
  styleUrl: './detalle-asignatura.component.css'
})
export class DetalleAsignaturaComponent {
  id: string | null = null;

  constructor(private location: Location,private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener nivelId desde la URL



 
  }
  volverAtras() {
    this.location.back();
  }
}
