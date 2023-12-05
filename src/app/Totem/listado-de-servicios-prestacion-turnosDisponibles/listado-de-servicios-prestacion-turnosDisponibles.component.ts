import { Component } from '@angular/core';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../modelos/dni';
import { Servicios } from '../modelos/servicios';
import { PrestacionDelServicio } from '../modelos/prestacionesDelServicio';
import { TurnosCreado } from '../modelos/turnosCreado';
import { Cobertura } from '../modelos/coberturas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-de-servicios-prestacion-turnosDisponibles',
  templateUrl: './listado-de-servicios-prestacion-turnosDisponibles.component.html',
  styleUrls: ['./listado-de-servicios-prestacion-turnosDisponibles.component.css']
})

export class ListadoDeServiciosPrestacionTurnosDisponiblesComponent {

  titulosPantalla: string[] = ["Seleccione un servicio", "Seleccione una prestación", "Seleccione un turno"];
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';
  servicios: Servicios[] = [];
  prestaciones: PrestacionDelServicio[] = [];
  turnos: TurnosCreado[] = [];
  idCentroDeAtencion: string = '';
  dCobertura: string = '';
  idFinanciador : number=0
  idPlan: number=0
  idPrestacion:number=0


  //Variables para transportar entre funciones
  idServicioSeleccionado: string = '';
    //Variables para transportar entre funciones
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
    // const dato_ = sessionStorage.getItem('nodoListaDeCoberturas');
    // if (dato_) {
    //   this.nodoListaDeCoberturas = JSON.parse(dato_);
    //   this.tituloPantalla = this.nodoListaDeCoberturas._Nombre;
    //   // console.log('Lista de turnos:', this.nodoListaDeTurnos._Id);
    // }
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

    const dCobertura = sessionStorage.getItem('CoberturaPaciente');

    if (dCobertura) {
      try {
        // Intenta convertir la cadena JSON a un objeto
        const dCoberturaObjeto = JSON.parse(dCobertura);
        const cober:Cobertura = JSON.parse(dCobertura);
        this.idFinanciador = cober.Financiador._Id
        this.idPlan = cober.Plan._Id

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
  }

  ngOnInit(): void {
    this.mostrarHora();
    this.obtenerServicios();
  }

    pasoActual = 1; // Paso inicial

    irAlPaso(paso: number) {
      this.pasoActual = paso;
    }

  seleccionarServicio(servicio: Servicios) {
    this.obtenerPrestacionesDelServicio(servicio.idServicio);
    this.titulosPantalla[1] = servicio.Nombre;
    this.idServicioSeleccionado = servicio.idServicio.toString();
    this.irAlPaso(2);
  }

  seleccionarPrestacion(prestacion: PrestacionDelServicio) {
    this.obtenerTurnosDisponibles(this.idServicioSeleccionado, prestacion._Id)
    this.idPrestacion = prestacion._Id
    this.titulosPantalla[2] = prestacion._Nombre;
    this.irAlPaso(3);
  }

  asignarNuevoTurno(index:number){
    // this.turnos[index].IdTurno
    // this.turnos[index].IdRecurso 
    // this.persona._Id
     const pTipoDeTurno:number=0 // 0 Significa tipo de turno control.
    // this.idFinanciador
    // this.idPlan 
    // this.idPrestacion 
    // this.idServicioSeleccionado
    Swal.fire({
      title: "Asinación de turno",
      text: "¿Confirma la asignación del nuevo turno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      this.api.getAsignarNuevoTurno(this.turnos[index].IdTurno,this.persona._Id,pTipoDeTurno, this.idPrestacion,this.idFinanciador,this.idPlan).subscribe((d)=>{
        if(d.Exito){
          // Remover la fila correspondiente al turno anulado.
          const id:string = "turno"+index.toString()
          const element = <HTMLElement> document.getElementById(id)
          element.remove()
          this.alert.mostrarAlerta(
            'Turno asignado exitosamente',
            AlertType.Success,
            4
          );
        }
      })
    }
  })
  }

  //Funciones para Obtener
  obtenerServicios() {
    this.api.getServicios(this.idCentroDeAtencion).subscribe((response: any) => {
      if (response && response.Servicios && response.Servicios.length > 0) {
        this.servicios = response.Servicios;
        this.titulosPantalla[0] = 'Seleccione un servicio';
      } else {
        this.titulosPantalla[0] = 'No hay servicios disponibles';
      }
    });
  }

  obtenerPrestacionesDelServicio(IdServicio: number) {
    this.api.getPrestacionesDelServicio(IdServicio, this.idCentroDeAtencion).subscribe((response: any) => {
      if (response && response.Prestaciones && response.Prestaciones.length > 0) {
        console.log("Soy los Prestaciones")
        this.prestaciones = response.Prestaciones;
      } else {
        this.prestaciones = [];
        this.titulosPantalla[1] = 'No hay prestaciones disponibles';
      }
    });
  }

  obtenerTurnosDisponibles(IdServicio: string, idPrestacion: number ) {
    this.api.getPrimerosTurnos(this.idCentroDeAtencion, IdServicio, idPrestacion, this.dCobertura).subscribe((response: any) => {
      console.log(response)
      if (response && response.Turnos && response.Turnos.length > 0) {
        this.turnos = response.Turnos;
      } else {
        this.turnos = [];
        this.titulosPantalla[2] = 'No hay turnos disponibles';
      }
    });
  }
  //Funciones para Obtener


  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
  
  volver() {
    if (this.pasoActual === 1) {
      this.router.navigate(['listaDeCoberturas']);
    } else if (this.pasoActual === 2) {
      this.irAlPaso(1);
    } else if (this.pasoActual === 3) {
      this.irAlPaso(2);
    }
  }
  

  salir(){
    this.router.navigate(['/']);
  }
}
