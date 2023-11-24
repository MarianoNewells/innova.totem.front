import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService } from '../servicios/alert.service';
import { NodoHijo, NodosHijos } from '../modelos/nodosHijos';

@Component({
  selector: 'app-seleccion-de-tramite',
  templateUrl: './seleccion-de-tramite.component.html',
  styleUrls: ['./seleccion-de-tramite.component.css'],
})
export class SeleccionDeTramiteComponent implements OnInit, AfterViewInit {
  nodoSeleccionDeTramite: NodoHijo = new NodoHijo();
  tituloPantalla: string = '';
  tramites: NodosHijos = [];
  idAccionAutorecepcionDeTurno:number=0
  idAccionConsultaDeEstudios:number=0
  idAccionCrearTurno:number=0
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService
  ) {
    this.idAccionAutorecepcionDeTurno = Number(sessionStorage.getItem('idAccionAutorecepcionDeTurno'))
    this.idAccionConsultaDeEstudios = Number(sessionStorage.getItem('idAccionConsultaDeEstudios'))
    this.idAccionCrearTurno = Number(sessionStorage.getItem('idAccionCrearTurno'))
    const dato_ = sessionStorage.getItem('nodoSeleccionDeTramite');
    if (dato_) {
      this.nodoSeleccionDeTramite = JSON.parse(dato_);
      this.tituloPantalla = this.nodoSeleccionDeTramite._Nombre;
    }
    // Buscar los trámites.
    //console.log('Seleccion de tramite: ' + this.nodoSeleccionDeTramite._Id);
    this.api
      .getNodosHijos(this.nodoSeleccionDeTramite._Id)
      .subscribe((datos) => {
        if (datos) {
          this.tramites = datos;
        }
      });
  }
  ngOnInit(): void {
    this.mostrarHora();
  }
  ngAfterViewInit(): void {}
  seleccionDeTramite(index: number) {
    let idSiguientePantalla: Number = this.tramites[index]._Id;
    console.log("idSiguientePantalla"+idSiguientePantalla)
    switch (idSiguientePantalla) {
      case this.idAccionCrearTurno: // Nuevo turno
      this.api
      .getNodosHijos(this.tramites[index]._Id)
      .subscribe((datos) => {
            if (datos) {
              sessionStorage.setItem(
                'nodoListaDeCoberturas',
                JSON.stringify(datos[0])
              );
              this.router.navigate(['listaDeCoberturas']); 
            }
          });
          break;
      case this.idAccionAutorecepcionDeTurno: // Autorecepción de turno
          // Buscar la sieguiente pantalla.
          // console.log('Lista de turnos:' + this.tramites[index]._Id);
          sessionStorage.setItem(
            'nodoListaDeTurnos',
            JSON.stringify(this.tramites[index])
          );
          this.router.navigate(['listaDeTurnos']);
          break;
      case this.idAccionConsultaDeEstudios: // Consulta de estudios
        sessionStorage.setItem(
          'nodoListaDeEstudios',
          JSON.stringify(this.tramites[index])
        );
        this.router.navigate(['listaDeEstudios']);
        break;
    }
  }
  volver() {
    this.router.navigate(['fechasDeNacimiento']);
  }
  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
  salir() {
    this.router.navigate(['/']);
  }
}
