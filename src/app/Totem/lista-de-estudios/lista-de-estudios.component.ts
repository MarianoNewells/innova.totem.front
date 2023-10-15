import { Component, OnInit } from '@angular/core';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodoHijo } from '../modelos/nodosHijos';
import { Persona } from '../modelos/dni';
import { Estudio, Estudios } from '../modelos/estudios';
import { ModalInformeComponent } from '../modales/modal-informe/modal-informe.component';

@Component({
  selector: 'app-lista-de-estudios',
  templateUrl: './lista-de-estudios.component.html',
  styleUrls: ['./lista-de-estudios.component.css']
})
export class ListaDeEstudiosComponent implements OnInit{
  nodoListaDeEstudios: NodoHijo = new NodoHijo();
  tituloPantalla: string = '';
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';
  estudios: Estudios = new Estudios();
  estudio: Estudio = new Estudio();
  modalRef:any
  constructor( private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,){
      const dato_ = sessionStorage.getItem('nodoListaDeEstudios');
      if (dato_!=null) {
        this.nodoListaDeEstudios = JSON.parse(dato_);
        this.tituloPantalla = this.nodoListaDeEstudios._Nombre;

      }
      const datoPersona = sessionStorage.getItem('Persona');
      if (datoPersona!=null) {
        this.persona = JSON.parse(datoPersona);
        this.nombreCompleto =
          this.persona._apellido + ', ' + this.persona._Nombre;
        this.dni = this.persona._Documento._Numero;
      }
    }


  ngOnInit(): void {
    this.api
    .getEstudios(this.persona._Id)
    .subscribe((datos) => {
      if (datos) {
        this.estudios = datos;
        if (this.estudios.Estudios.length == 0) {
          this.tituloPantalla = 'No hay turnos disponibles';
        }
      }
    });
    this.mostrarHora()
  }

  verEstudio(index:number){
    const idEstudio = this.estudios.Estudios[index].id
    this.api.getInforme(idEstudio).subscribe((data)=>{
      var blob = new Blob([this._base64ToArrayBuffer(data.Informe)], {
        type: 'application/pdf',
      });
      const pdfurl = URL.createObjectURL(blob);
      this.modalRef = this.modalService.open(ModalInformeComponent, { size: 'lg', centered: true });
      this.modalRef.componentInstance.data=pdfurl
    })
  }

  _base64ToArrayBuffer(base64: string) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
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

  }

}