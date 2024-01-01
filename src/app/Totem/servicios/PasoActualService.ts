// paso.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasoService {
  private pasoActualSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  obtenerPasoActualObservable(): Observable<number> {
    return this.pasoActualSubject.asObservable();
  }

  cambiarAlSiguientePaso() {
    const nuevoPaso = this.pasoActualSubject.value + 1;
    this.pasoActualSubject.next(nuevoPaso);
  }

  volverAlPasoAnterior() {
    const nuevoPaso = Math.max(1, this.pasoActualSubject.value - 1);
    this.pasoActualSubject.next(nuevoPaso);
  }

  actualizarPasoActual(nuevoPaso: number) {
    this.pasoActualSubject.next(nuevoPaso);
  }
}
