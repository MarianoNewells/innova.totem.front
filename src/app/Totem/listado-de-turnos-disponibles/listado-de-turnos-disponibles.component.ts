import { Component } from '@angular/core';
import { Persona } from '../modelos/dni';
import { Router } from '@angular/router';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { AlertService } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-de-turnos-disponibles',
  templateUrl: './listado-de-turnos-disponibles.component.html',
  styleUrls: ['./listado-de-turnos-disponibles.component.css']
})
export class ListadoDeTurnosDisponiblesComponent {
  tituloPantalla: string = '';
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';
  // turnos: Turnos = new Turnos();
  // turno: Turno = new Turno();
  idCentroDeAtencion: string = '';
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.mostrarHora();
  }

  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
  
  volver() {
    this.router.navigate(['seleccionDeTramite']);
  }

  salir(){
    this.router.navigate(['/']);
  }
}
