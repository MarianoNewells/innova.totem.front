import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../servicios/alert.service';
import { NodoHijo } from '../modelos/nodosHijos';
import { Persona } from '../modelos/dni';
import { Turno, Turnos } from '../modelos/turnos';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTicketComponent } from '../modales/modal-ticket/modal-ticket.component';
import * as FileSaver from 'file-saver';
import { default as conf } from 'src/assets/config.json';
import { RecepcionExitosaComponent } from '../recepcion-exitosa/recepcion-exitosa.component';
import { RecepcionNoExitosaComponent } from '../recepcion-no-exitosa/recepcion-no-exitosa.component';
import Swal from 'sweetalert2';
import {utils}from "src/assets/ts/utils";


@Component({
  selector: 'app-lista-de-turnos',
  templateUrl: './lista-de-turnos.component.html',
  styleUrls: ['./lista-de-turnos.component.css'],
})
export class ListaDeTurnosComponent implements OnInit, AfterViewInit {
  // Para poder tomar la referencia del elemento hay que implementar AfterViewInit y el método ngAfterViewInit
  @ViewChild('CloseModalToken') CloseModalToken!: ElementRef;
  nodoListaDeTurnos: NodoHijo = new NodoHijo();
  tituloPantalla: string = '';
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';
  turnos: Turnos = new Turnos();
  turno: Turno = new Turno();
  idCentroDeAtencion: string = '';
  numeros: FormGroup;
  pdfurl: string = '';
  modalRef:any
  utils:utils=new utils() 
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
    this.numeros = new FormGroup({
      token: new FormControl(''),
    });

    const dato_ = sessionStorage.getItem('nodoListaDeTurnos');
    if (dato_) {
      this.nodoListaDeTurnos = JSON.parse(dato_);
      this.tituloPantalla = this.nodoListaDeTurnos._Nombre;
      // console.log('Lista de turnos:', this.nodoListaDeTurnos._Id);
    }
    const datoPersona = sessionStorage.getItem('Persona');
    if (datoPersona) {
      this.persona = JSON.parse(datoPersona);
      this.nombreCompleto =
        this.persona._apellido + ', ' + this.persona._Nombre;
      this.dni = this.persona._Documento._Numero;
    }

    const idCentroDeAtencion = sessionStorage.getItem('idCentroDeAtencion');
    
    //console.log('idCentroDeAtencion: ' + idCentroDeAtencion);
    if (idCentroDeAtencion) {
      this.idCentroDeAtencion = idCentroDeAtencion;
    }
  }

  // El evento ngAfterViewInit() tiene que estar declarado para poder usar:  @ViewChild('CloseModalToken') CloseModalToken!: ElementRef;
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.api
      .getTurnosParaAutorecepcion(this.persona._Id, this.idCentroDeAtencion)
      .subscribe((datos) => {
        if (datos) {
          this.turnos = datos;
          if (this.turnos.Turnos.length == 0) {
            this.tituloPantalla = 'No hay turnos disponibles';
          }
        }
      });
    this.mostrarHora();
  }

  onClickNumero(n: string) {
    const numeroActual = this.numeros.get('token')?.value;
    const nuevoNumero = numeroActual + n;
    this.numeros.controls['token'].setValue(nuevoNumero);
  }

  borrar() {
    const numeroActual = this.numeros.get('token')?.value;
    const nuevoNumero = numeroActual.substring(0, numeroActual.length - 1);
    this.numeros.controls['token'].setValue(nuevoNumero);
  }

  anulacion(index: number){
    this.turno = this.turnos.Turnos[index]; 
      Swal.fire({
        title: "Anulación de turno",
        text: "¿Confirma la anulación del turno?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.api.getAnulacionDeTurno(this.turno.idTurno).subscribe((d)=>{
          if(d.ExitoEnAnulacion){
            // Remover la fila correspondiente al turno anulado.
            const element = <HTMLElement> document.getElementById(String(index))
            element.remove()
            this.alert.mostrarAlerta(
              'Anulación de turno exitosa',
              AlertType.Success,
              4
            );
          }
        })
      }
    })
  }

  // Se ejecuta por el click en el botón "seleccionar" y deja seteado el turno.
  autorecepcion(index: number) {
    this.turno = this.turnos.Turnos[index];
    if(!this.turno.AceptaAutogestion){
       // Cerrar el modal del token.
      let el: HTMLElement = this.CloseModalToken.nativeElement;
      el.click();
      this.api.getTicketRecepcionista(this.turno.idTurno).subscribe((data)=>{
        if(data.Exito){
          var blob = new Blob([this.utils._base64ToArrayBuffer(data.ReporteTicketRecepcionistaString)], {
            type: 'application/pdf',
          });
          this.pdfurl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = this.pdfurl;
          document.body.appendChild(iframe);
          if(iframe.contentWindow!=null){
            iframe.contentWindow.print();
          }
          this.modalRef = this.modalService.open(RecepcionNoExitosaComponent, { size: 'lg', centered: true });
        
          setTimeout(() => {
            this.modalRef.close()
            }, 15000);
  
          //this.router.navigate(['/']);
        }
      })
     
    }
  }

  aceptar() {
    let token = this.numeros.get('token')?.value;
    if (token == '') {
      this.alert.mostrarAlerta(
        'No se ha ingresado un token.',
        AlertType.Danger,
        4
      );
      return;
    }

    // Cerrar el modal del token.
    let el: HTMLElement = this.CloseModalToken.nativeElement;
    el.click();

  Swal.fire({
      title: "Autorecepción de turno",
      text: "¿Confirma la autorecepción del turno seleccionado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
        //Disparar proceso de autorecepcion.
        this.api.getAutorecepcion(this.turno.idTurno, token).subscribe((data) => {
          if (data.Exito) {
          var blob = new Blob([this.utils._base64ToArrayBuffer(data.ReporteTicketString)], {
            type: 'application/pdf',
          });
          this.pdfurl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = this.pdfurl;
          document.body.appendChild(iframe);
          if(iframe.contentWindow!=null){
            iframe.contentWindow.print();
          }
                
          this.modalRef = this.modalService.open(RecepcionExitosaComponent, { size: 'lg', centered: true });
          
          setTimeout(() => {
            this.modalRef.close()
            }, 15000);

          this.router.navigate(['/']);
        } else{
          let error:string = "Se ha producido un error en el proceso de " + data.ErrorProceso
          if(data.ErrorMensaje.includes("Token")){
            error+=".TOKEN INVALIDO."
          }
          this.alert.mostrarAlerta(
            error,
            AlertType.Danger,
            7
          );
        }
      });  
    }
  })


   

    // this.http
    //   .get('./assets/reportePdf.txt', { responseType: 'text' })
    //   .subscribe((data) => {
    //       var blob = new Blob([this._base64ToArrayBuffer(data)], {
    //         type: 'application/pdf',
    //       });
    //       this.pdfurl = URL.createObjectURL(blob);

    //     const iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.src = this.pdfurl;
    //     document.body.appendChild(iframe);
    //     if(iframe.contentWindow!=null){
    //       iframe.contentWindow.print();
    //     }
         
    //     this.modalRef = this.modalService.open(RecepcionExitosaComponent, { size: 'lg', centered: true });
        
    //     setTimeout(() => {
    //       this.modalRef.close()
    //       }, 15000);
          
    //     //this.router.navigate(['/']);
    //   });
  }
 

  volver() {
    this.router.navigate(['seleccionDeTramite']);
  }
  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }

  salir(){
    this.router.navigate(['/']);
  }
}

