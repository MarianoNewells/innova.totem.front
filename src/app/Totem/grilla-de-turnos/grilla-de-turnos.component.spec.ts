import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaDeTurnosComponent } from './grilla-de-turnos.component';

describe('GrillaDeTurnosComponent', () => {
  let component: GrillaDeTurnosComponent;
  let fixture: ComponentFixture<GrillaDeTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaDeTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaDeTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
