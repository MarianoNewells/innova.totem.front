import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeCentrosComponent } from './listado-de-centros.component';

describe('ListadoDeCentrosComponent', () => {
  let component: ListadoDeCentrosComponent;
  let fixture: ComponentFixture<ListadoDeCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeCentrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
