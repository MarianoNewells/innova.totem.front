import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeTurnosDisponiblesComponent } from './listado-de-turnos-disponibles.component';

describe('ListadoDeTurnosDisponiblesComponent', () => {
  let component: ListadoDeTurnosDisponiblesComponent;
  let fixture: ComponentFixture<ListadoDeTurnosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeTurnosDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeTurnosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
