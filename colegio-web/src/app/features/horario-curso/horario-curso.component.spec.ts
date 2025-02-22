import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCursoComponent } from './horario-curso.component';

describe('HorarioCursoComponent', () => {
  let component: HorarioCursoComponent;
  let fixture: ComponentFixture<HorarioCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
