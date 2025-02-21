import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPostulantesComponent } from './listado-postulantes.component';

describe('ListadoPostulantesComponent', () => {
  let component: ListadoPostulantesComponent;
  let fixture: ComponentFixture<ListadoPostulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPostulantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
