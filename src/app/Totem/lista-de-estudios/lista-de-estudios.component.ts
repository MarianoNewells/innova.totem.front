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
import { RecepcionRetirarEstudioComponent } from '../recepcion-retirar-estudio/recepcion-retirar-estudio.component';

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
  idPersona:number=0
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
        this.idPersona = this.persona._Id
      }
    }


  ngOnInit(): void {
    this.api
    .getEstudios(this.persona._Id)
    .subscribe((datos) => {
      if (datos) {
        this.estudios = datos;
        if (this.estudios.Estudios.length == 0) {
          this.tituloPantalla = 'No hay estudios disponibles';
        }
        else{
          this.estudios.Estudios.map(item=>{
            item.FechaRealizacionString = item.FechaRealizacionString.replaceAll("//","/")
          })
        }
        //console.log(this.estudios.Estudios)
      }
    });
    this.mostrarHora()
  }

  verEstudio(index:number){
    const idEstudio = this.estudios.Estudios[index].id
    const idCentroDeAtencion = Number(sessionStorage.getItem('idCentroDeAtencion'));
    const nombreEstudio = this.estudios.Estudios[index].NombreEstudio
    this.api.getInforme(idEstudio,idCentroDeAtencion,this.idPersona).subscribe((data)=>{
      var blob = new Blob([this._base64ToArrayBuffer(data.Ticket)], {
        type: 'application/pdf',
      });
      
      const pdfurl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfurl;
      document.body.appendChild(iframe);
      if(iframe.contentWindow!=null){
        iframe.contentWindow.print();
      }

      this.modalRef = this.modalService.open(RecepcionRetirarEstudioComponent, { size: 'lg', centered: true });
        
      setTimeout(() => {
        this.modalRef.close()
        }, 15000);

       //this.router.navigate(['/']);

      // const pdfurl = URL.createObjectURL(blob);
      // this.modalRef = this.modalService.open(ModalInformeComponent, { size: 'lg', centered: true });
      // this.modalRef.componentInstance.data=pdfurl
      // this.modalRef.componentInstance.nombreCompleto=this.nombreCompleto
      // this.modalRef.componentInstance.ref = this.modalRef
      // this.modalRef.componentInstance.nombreEstudio = nombreEstudio.substring(0,60)
      // setInterval(() => {
      //   this.modalRef.close()
      // }, 60000);
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
    this.router.navigate(['/']);
  }

}