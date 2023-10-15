import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEstudiosComponent } from './lista-de-estudios.component';

describe('ListaDeEstudiosComponent', () => {
  let component: ListaDeEstudiosComponent;
  let fixture: ComponentFixture<ListaDeEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeEstudiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
