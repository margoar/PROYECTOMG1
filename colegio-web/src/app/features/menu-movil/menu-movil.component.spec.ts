import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMovilComponent } from './menu-movil.component';

describe('MenuMovilComponent', () => {
  let component: MenuMovilComponent;
  let fixture: ComponentFixture<MenuMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMovilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
