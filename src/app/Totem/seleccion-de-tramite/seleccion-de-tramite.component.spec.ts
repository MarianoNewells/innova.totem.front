import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDeTramiteComponent } from './seleccion-de-tramite.component';

describe('SeleccionDeTramiteComponent', () => {
  let component: SeleccionDeTramiteComponent;
  let fixture: ComponentFixture<SeleccionDeTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionDeTramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionDeTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
