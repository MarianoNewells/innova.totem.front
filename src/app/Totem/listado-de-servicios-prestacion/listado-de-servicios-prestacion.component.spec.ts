import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeServiciosPrestacionComponent } from './listado-de-servicios-prestacion.component';

describe('ListadoDeServiciosPrestacionComponent', () => {
  let component: ListadoDeServiciosPrestacionComponent;
  let fixture: ComponentFixture<ListadoDeServiciosPrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeServiciosPrestacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeServiciosPrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
