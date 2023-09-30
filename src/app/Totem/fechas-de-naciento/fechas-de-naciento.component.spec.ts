import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasDeNacientoComponent } from './fechas-de-naciento.component';

describe('FechasDeNacientoComponent', () => {
  let component: FechasDeNacientoComponent;
  let fixture: ComponentFixture<FechasDeNacientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechasDeNacientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FechasDeNacientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
