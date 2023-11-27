import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeDiasDisponiblesComponent } from './listado-de-dias-disponibles.component';

describe('ListadoDeDiasDisponiblesComponent', () => {
  let component: ListadoDeDiasDisponiblesComponent;
  let fixture: ComponentFixture<ListadoDeDiasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeDiasDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeDiasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
