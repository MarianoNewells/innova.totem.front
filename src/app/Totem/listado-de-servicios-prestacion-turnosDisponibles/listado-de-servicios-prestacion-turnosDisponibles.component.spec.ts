import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeServiciosPrestacionTurnosDisponiblesComponent } from './listado-de-servicios-prestacion-turnosDisponibles.component';

describe('ListadoDeServiciosPrestacionComponent', () => {
  let component: ListadoDeServiciosPrestacionTurnosDisponiblesComponent;
  let fixture: ComponentFixture<ListadoDeServiciosPrestacionTurnosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeServiciosPrestacionTurnosDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeServiciosPrestacionTurnosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
