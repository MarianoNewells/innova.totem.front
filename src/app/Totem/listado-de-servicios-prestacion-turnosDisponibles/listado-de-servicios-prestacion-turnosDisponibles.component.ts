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
import { PasoService } from '../servicios/PasoActualService';
import { Observable, take } from 'rxjs';
import { NodoHijo } from '../modelos/nodosHijos';

@Component({
  selector: 'app-listado-de-servicios-prestacion-turnosDisponibles',
  templateUrl: './listado-de-servicios-prestacion-turnosDisponibles.component.html',
  styleUrls: ['./listado-de-servicios-prestacion-turnosDisponibles.component.css']
})

export class ListadoDeServiciosPrestacionTurnosDisponiblesComponent {

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
  tituloServicio:string=""
  tituloPrestaciones:string=""
  tituloTurnos:string=""
  tituloPantalla:string=""
  nodoServicios: NodoHijo = new NodoHijo();
  nodoPrestaciones: NodoHijo = new NodoHijo();
  nodoTurnos: NodoHijo = new NodoHijo();

  //Variables para transportar entre funciones
  idServicioSeleccionado: string = '';
  //Variables para transportar entre funciones

  pasoActual$: Observable<number> | any;
  
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
    public pasoService: PasoService
  ) {
      const dato_ = sessionStorage.getItem('nodoServicios');
      if (dato_) {
        this.nodoServicios = JSON.parse(dato_);
        this.tituloServicio = this.nodoServicios._Nombre;
        this.tituloPantalla = this.tituloServicio
        this.api.getNodosHijos(this.nodoServicios._Id).subscribe((datosPrestaciones) => {
          sessionStorage.setItem('nodoPrestaciones', JSON.stringify(datosPrestaciones[0]));
          this.nodoPrestaciones = datosPrestaciones[0]
          this.tituloPrestaciones=this.nodoPrestaciones._Nombre
          this.api.getNodosHijos(this.nodoPrestaciones._Id).subscribe((datosTurnos) => {
            sessionStorage.setItem('nodoTurnos', JSON.stringify(datosTurnos[0]));
            this.nodoTurnos = datosTurnos[0]
            this.tituloTurnos=this.nodoTurnos._Nombre
          })
        })
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

    this.idServicioSeleccionado = sessionStorage.getItem('idServicioSeleccionado') ?? '';
    
    this.idPrestacion = JSON.parse(sessionStorage.getItem('idPrestacion') || '0');
    //this.idPlan = JSON.parse(sessionStorage.getItem('idPlan') || '0');

  // Recuperar datos de sessionStorage
  const serviciosFromStorage = JSON.parse(sessionStorage.getItem('servicios') || '[]');
  const prestacionesFromStorage = JSON.parse(sessionStorage.getItem('prestaciones') || '[]');
  const turnosFromStorage = JSON.parse(sessionStorage.getItem('turnos') || '[]');

  // Asignar datos a las variables existentes
  this.servicios = serviciosFromStorage;
  this.prestaciones = prestacionesFromStorage;
  this.turnos = turnosFromStorage;

    this.pasoActual$ = this.pasoService.obtenerPasoActualObservable();
  }

  getTituloSegunPaso(pasoActual: number): string {
    switch (pasoActual) {
      case 1:
        this.tituloPantalla = this.tituloServicio
        return '';
      case 2:
        this.tituloPantalla = this.tituloPrestaciones
        return '';
      case 3:
        this.tituloPantalla = this.tituloTurnos
        return '';
      default:
        return '';
    }
  }

  irAlPaso(paso: number) {
    this.pasoService.actualizarPasoActual(paso);
    console.log("estoy en el paso " + paso)
  }

  seleccionarServicio(servicio: Servicios) {
    this.obtenerPrestacionesDelServicio(servicio.idServicio);
    this.idServicioSeleccionado = servicio.idServicio.toString();
    this.irAlPaso(2);
  }

  seleccionarPrestacion(prestacion: PrestacionDelServicio) {
    this.obtenerTurnosDisponibles(this.idServicioSeleccionado, prestacion._Id)
    this.idPrestacion = prestacion._Id
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
          this.router.navigate(['/']);
        }
      })
    }
  })
  }

  verMasTurnos(index:number){
    sessionStorage.setItem("turnoSeleccionado",JSON.stringify(this.turnos[index]))
    sessionStorage.setItem("idServicioSeleccionado",this.idServicioSeleccionado)
    sessionStorage.setItem("idPrestacion",JSON.stringify(this.idPrestacion))
    sessionStorage.setItem("idPlan",JSON.stringify(this.idPlan))
    this.router.navigate(['grillaDeTurnos'])
  }
  
  //Funciones para Obtener
  obtenerServicios() {
    this.api.getServicios(this.idCentroDeAtencion).subscribe((response: any) => {
      if (response && response.Servicios && response.Servicios.length > 0) {
        this.servicios = response.Servicios;
        sessionStorage.setItem('servicios', JSON.stringify(this.servicios));
      }
    });
  }

  obtenerPrestacionesDelServicio(IdServicio: number) {
    this.api.getPrestacionesDelServicio(IdServicio, this.idCentroDeAtencion).subscribe((response: any) => {
      if (response && response.Prestaciones && response.Prestaciones.length > 0) {
        console.log("Soy los Prestaciones")
        this.prestaciones = response.Prestaciones;
        sessionStorage.setItem('prestaciones', JSON.stringify(this.prestaciones));
      } else {
        this.prestaciones = [];
      }
    });
  }

  obtenerTurnosDisponibles(IdServicio: string, idPrestacion: number ) {
    this.api.getPrimerosTurnos(this.idCentroDeAtencion, IdServicio, idPrestacion, this.dCobertura).subscribe((response: any) => {
      console.log(response)
      if (response && response.Turnos && response.Turnos.length > 0) {
        this.turnos = response.Turnos;
        sessionStorage.setItem('turnos', JSON.stringify(this.turnos));
      } else {
        this.turnos = [];
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
    this.pasoService.obtenerPasoActualObservable().pipe(take(1)).subscribe({
      next: (pasoActual: number) => {
        if (pasoActual === 1) {
          this.router.navigate(['listaDeCoberturas']);
          console.log("Voy al lista");
          sessionStorage.removeItem('servicios');
        } else if (pasoActual === 2) {
          console.log("Voy al paso 1");
          this.irAlPaso(1);
          sessionStorage.removeItem('prestaciones');
        } else if (pasoActual === 3) {
          console.log("Voy al paso 2");
          this.irAlPaso(2);
          sessionStorage.removeItem('turnos');
        }
      },
      error: (error) => {
        console.error('Error al obtener el paso actual:', error);
      }
    });
  }
       
  salir(){
    this.router.navigate(['/']);
  }
}
