import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { Cobertura } from "src/app/Totem/modelos/coberturas";
import { Persona } from "src/app/Totem/modelos/dni";
import { TurnosCreado } from "src/app/Totem/modelos/turnosCreado";
import { AlertService, AlertType } from "src/app/Totem/servicios/alert.service";
import { ApisBackEndService } from "src/app/Totem/servicios/apis-back-end.service";
import Swal from "sweetalert2";

export interface IDia {
  FechaTurno: string;
  FechaComoString: string;
  TituloColumna: string;
  Fecha: Date;
}

export interface FechaData {
  fecha: Date;
  DatosTabla: DatosTabla[];
}

export interface DatosTabla {
  titulo: string;
  horarios: HorarioData[];
}

export interface HorarioData {
  Hora: string;
  IdTurno: number;
}

@Component({
  selector: 'app-appointment-selector',
  templateUrl: './appointment-selector.component.html',
  styleUrls: ['./appointment-selector.component.css']
})
export class AppointmentSelectorComponent implements OnInit {
  @Input() appointmentSelectorsData$: Observable<FechaData[]> | undefined;
  
  idRecurso:number=0
  idServicioSeleccionado:number=0
  idCentroDeAtencion:number=0
  idPrestacion:number=0
  idPlan:number=0
  idFinanciador : number=0


  turno:TurnosCreado=new TurnosCreado
  
  persona: Persona = new Persona();

  nombreCompleto: string = '';
  dni: string = '';

  ngOnInit(): void {
    this.appointmentSelectorsData$ = this.appointmentSelectorsData$ || of([]);
    console.log(this.appointmentSelectorsData$)
  }

  constructor( private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal){

      const dCobertura = sessionStorage.getItem('CoberturaPaciente');

      if (dCobertura) {
        try {
          // Intenta convertir la cadena JSON a un objeto
          const dCoberturaObjeto = JSON.parse(dCobertura);
          const cober:Cobertura = JSON.parse(dCobertura);
          this.idPlan = cober.Plan._Id
          this.idFinanciador = cober.Financiador._Id
  
          // Me fijo si tiene el dato IdCobertura 
          if ('idCobertura' in dCoberturaObjeto) {
            // Le doy el valor idcovertura a una const
            const idCobertura = dCoberturaObjeto.idCobertura
       
            // Haz lo que necesites con el idCobertura
            console.log('ID de Cobertura:', idCobertura);
          } else {
            console.error('El objeto no tiene la propiedad "idCobertura".');
          }
        } catch (error) {
          console.error('Error al analizar la cadena JSON:', error);
        }
      }
      
      const datoPersona = sessionStorage.getItem('Persona');
      if (datoPersona) {
        this.persona = JSON.parse(datoPersona);
        this.nombreCompleto =
          this.persona._apellido + ', ' + this.persona._Nombre;
          this.dni = this.persona._Documento._Numero;
      }

    let d = sessionStorage.getItem("turnoSeleccionado")
    if(d){
      this.turno = JSON.parse(d)
    }
   this.idRecurso=this.turno.IdRecurso
    d = sessionStorage.getItem("idServicioSeleccionado")
    if(d){
      this.idServicioSeleccionado = Number(JSON.parse(d))
    }
    d = sessionStorage.getItem('idCentroDeAtencion');
    if(d){
      this.idCentroDeAtencion = Number(JSON.parse(d))
    }
    d = sessionStorage.getItem('idPrestacion');
    if(d){
      this.idPrestacion = Number(JSON.parse(d))
    }
    d = sessionStorage.getItem('idPlan');
    if(d){
      this.idPlan = Number(JSON.parse(d))
    } 
  }

  capitalizeFirstLetter(text: string): string {
    return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  asignarNuevoTurno(idturno: number, horario: any){
    // this.turnos[index].IdTurno
    // this.turnos[index].IdRecurso 
    // this.persona._Id
     const pTipoDeTurno:number=0 // 0 Significa tipo de turno control.
    // this.idFinanciador
    // this.idPlan 
    // this.idPrestacion 
    // this.idServicioSeleccionado
    Swal.fire({
      title: "Asinación de turno \n"+ this.capitalizeFirstLetter(this.turno.NombreRecurso) +  " a las " + horario,
      text: "¿Confirma la asignación del nuevo turno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
  }).then(

    (result) => {
    if (result.value) {
      this.api.getAsignarNuevoTurno(idturno,this.persona._Id,pTipoDeTurno, this.idPrestacion,this.idFinanciador,this.idPlan).subscribe((d)=>{
        if(d.Exito){
          this.alert.mostrarAlerta(
            'Turno asignado exitosamente',
            AlertType.Success,
            4
          );
        }
      })
    }
  }
  )
  }

  
}
