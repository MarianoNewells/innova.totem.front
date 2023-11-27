import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Acciones } from '../modelos/acciones';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
})
export class BienvenidaComponent {
  idNodoRaiz: number = 0;
  constructor(private router: Router, private api: ApisBackEndService) {
    // Obtener los datos de inicialización del Totem.
    this.api.getInicializacionTotem().subscribe((data) => {
      const idTerminal = data.Id;
      //console.log(idTerminal);
      const idSalaDeEspera = data.IdSalaDeEspera;
      const idCentroDeAtencion = data.IdCentroDeAtencion;
      //console.log('idCentroDeAtencion: ' + idCentroDeAtencion);
      sessionStorage.setItem('idTerminal', JSON.stringify(idTerminal));
      sessionStorage.setItem('idSalaDeEspera', JSON.stringify(idSalaDeEspera));
      sessionStorage.setItem(
        'idCentroDeAtencion',
        JSON.stringify(idCentroDeAtencion)
      );
   
      // Obtener el nodo raíz.
      this.api.getNodoRaiz(idTerminal).subscribe((datos) => {
        this.idNodoRaiz = datos._Id;
        // console.log('Nodo Raiz:' + this.idNodoRaiz);
        sessionStorage.setItem('idNodoRaiz', JSON.stringify(this.idNodoRaiz));
      });
      this.api.getAcciones(idTerminal).subscribe((data) => {
       sessionStorage.setItem('idAccionAutorecepcionDeTurno', JSON.stringify(data.IdAutorecepcionDeTurno));
       sessionStorage.setItem('idAccionConsultaDeEstudios', JSON.stringify(data.IdConsultaDeEstudios));
       sessionStorage.setItem('idAccionCrearTurno', JSON.stringify(data.IdCrearTurno));
    })
    });
      // Obtener las acciones del totem
    // console.log('idAccionAutorecepcionDeTurno:',sessionStorage.getItem('idAccionAutorecepcionDeTurno'))
    // console.log('idAccionConsultaDeEstudios:',sessionStorage.getItem('idAccionConsultaDeEstudios'))
    // console.log('idAccionCrearTurno:',sessionStorage.getItem('idAccionCrearTurno'))
  }

  inicio() {
    // Obtener el nodo de ingreso de DNI.
    this.api.getNodosHijos(this.idNodoRaiz).subscribe((datosDni) => {
      //console.log(datosDni[0]);
      sessionStorage.setItem('nodoDni', JSON.stringify(datosDni[0]));
      this.router.navigate(['dni']);
    });
  }
}
