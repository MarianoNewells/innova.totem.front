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
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService
  ) {
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
          // console.log(
          //   'Trámites: ' +
          //     this.tramites[0]._Id +
          //     ', ' +
          //     this.tramites[1]._Id +
          //     ', ' +
          //     this.tramites[2]._Id
          // );
        }
      });
  }
  ngOnInit(): void {
    this.mostrarHora();
  }
  ngAfterViewInit(): void {}
  seleccionDeTramite(index: number) {
    let idSiguientePantalla: Number = this.tramites[index]._Id;
    switch (idSiguientePantalla) {
      case 23: // Nuevo turno
        break;
      case 24: // Autorecepción de turno
        // Buscar la sieguiente pantalla.
        // console.log('Lista de turnos:' + this.tramites[index]._Id);
        sessionStorage.setItem(
          'nodoListaDeTurnos',
          JSON.stringify(this.tramites[index])
        );
        this.router.navigate(['listaDeTurnos']);
        break;
      case 25: // Consulta de estudios
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
