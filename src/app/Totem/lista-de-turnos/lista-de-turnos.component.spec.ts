import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeTurnosComponent } from './lista-de-turnos.component';

describe('ListaDeTurnosComponent', () => {
  let component: ListaDeTurnosComponent;
  let fixture: ComponentFixture<ListaDeTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
