import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionNoExitosaComponent } from './recepcion-no-exitosa.component';

describe('RecepcionNoExitosaComponent', () => {
  let component: RecepcionNoExitosaComponent;
  let fixture: ComponentFixture<RecepcionNoExitosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionNoExitosaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionNoExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
