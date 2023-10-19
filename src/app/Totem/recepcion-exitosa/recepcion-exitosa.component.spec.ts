import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionExitosaComponent } from './recepcion-exitosa.component';

describe('RecepcionExitosaComponent', () => {
  let component: RecepcionExitosaComponent;
  let fixture: ComponentFixture<RecepcionExitosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionExitosaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
