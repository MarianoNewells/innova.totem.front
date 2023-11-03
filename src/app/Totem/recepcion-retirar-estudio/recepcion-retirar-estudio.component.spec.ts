import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionRetirarEstudioComponent } from './recepcion-retirar-estudio.component';

describe('RecepcionRetirarEstudioComponent', () => {
  let component: RecepcionRetirarEstudioComponent;
  let fixture: ComponentFixture<RecepcionRetirarEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionRetirarEstudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionRetirarEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
