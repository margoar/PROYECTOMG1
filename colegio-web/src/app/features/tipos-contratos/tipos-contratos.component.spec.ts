import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposContratosComponent } from './tipos-contratos.component';

describe('TiposContratosComponent', () => {
  let component: TiposContratosComponent;
  let fixture: ComponentFixture<TiposContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposContratosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
