import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../servicios/alert.service';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { Persona } from '../modelos/dni';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listado-de-centros',
  templateUrl: './listado-de-centros.component.html',
  styleUrls: ['./listado-de-centros.component.css']
})
export class ListadoDeCentrosComponent {
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

  obraSocial() {
    this.router.navigate(['dni']);
  }
}
