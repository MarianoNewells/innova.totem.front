import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeCoberturasComponent } from './lista-de-coberturas.component';

describe('ListaDeCoberturasComponent', () => {
  let component: ListaDeCoberturasComponent;
  let fixture: ComponentFixture<ListaDeCoberturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeCoberturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeCoberturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
