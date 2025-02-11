import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resumen-curso',
  standalone : true,
  imports: [RouterModule],
  templateUrl: './resumen-curso.component.html',
  styleUrl: './resumen-curso.component.css'
})
export class ResumenCursoComponent {
  id: string | null = null;

    constructor(
      private route : ActivatedRoute
    ){}
}
