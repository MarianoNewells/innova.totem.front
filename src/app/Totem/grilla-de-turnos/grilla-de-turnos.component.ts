import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef } from 'ag-grid-community'; // Column Definitions Interface
import { TurnosCreado } from '../modelos/turnosCreado';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDia } from '../modelos/fechasDeTurnos';
import { HorarioDiaMedico, IHorario } from '../modelos/horariosDiasMedico';
import Swal from 'sweetalert2';
import { PasoService } from '../servicios/PasoActualService';
import { RecepcionExitosaComponent } from '../recepcion-exitosa/recepcion-exitosa.component';
import { Persona } from '../modelos/dni';
import { Cobertura } from '../modelos/coberturas';
import { AppointmentSelectorComponent, FechaData } from './selector/appointment-selector/appointment-selector.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-grilla-de-turnos',
  templateUrl: './grilla-de-turnos.component.html',
  styleUrls: ['./grilla-de-turnos.component.css']
})

export class GrillaDeTurnosComponent implements OnInit  {
  public retrocesoHabilitado: boolean = false;

  modalRef:any
  pdfurl: string = '';

  themeClass:string ="ag-theme-quartz";
  turno:TurnosCreado=new TurnosCreado
  idRecurso:number=0
  idServicioSeleccionado:number=0
  idCentroDeAtencion:number=0
  idPrestacion:number=0
  idPlan:number=0
  max:number=0
  mesActivo:string=""
  horarioSeleccionado:string=""
  turnoSeleccionado:any=0
  fechaSeleccionada:Date= new Date()
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';

  @ViewChild(AppointmentSelectorComponent) appointmentSelectorComponent!: AppointmentSelectorComponent;
  fechasConHorarios$: Observable<FechaData[]> | undefined;
  
  constructor( private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
    private pasoActualService: PasoService){

      const dCobertura = sessionStorage.getItem('CoberturaPaciente');

      if (dCobertura) {
        try {
          // Intenta convertir la cadena JSON a un objeto
          const dCoberturaObjeto = JSON.parse(dCobertura);
          const cober:Cobertura = JSON.parse(dCobertura);
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
    // d = sessionStorage.getItem('idPlan');
    // if(d){
    //   this.idPlan = Number(JSON.parse(d))
    // } 
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

  todasLasFechas: any[] = [];

  ngOnInit(): void {
    this.fechasConHorarios$ = of([]);

    this.cargarFechas();
    this.mostrarHora();

    this.mesActivo = this.getMesesPresentes(this.todasLasFechas);

    this.retrocesoHabilitado = false;
  }
  
  cargarFechas(): void {
    this.api.getFechasTurnosDelMedico(
      this.idRecurso,
      this.idServicioSeleccionado,
      this.idCentroDeAtencion,
      0,
      this.idPrestacion,
      this.idPlan
    ).subscribe((data) => {
      console.log(data);
      this.todasLasFechas = data.Dias.map((dia: IDia) => {
        const fechaData = {
          fecha: new Date(dia.FechaTurno),
          datos: [
            {
              titulo: dia.TituloColumna,
              horarios: []
            }
          ]
        };
  
        // Después de procesar la primera fecha, cargar sus horarios inmediatamente
        this.cargarHorariosParaFecha(fechaData);
  
        return fechaData;
      });
  
      // Mostrar los primeros 7 días al cargar
      this.mostrarSiguientesFechas();
    });
  }
  
  cargarHorariosParaFecha(fechaData: any): void {
    this.api.getHorariosDiaMedico(
      this.idRecurso,
      this.idServicioSeleccionado,
      this.idCentroDeAtencion,
      0,
      this.idPrestacion,
      fechaData.fecha
    ).then((horariosData: HorarioDiaMedico) => {
      console.log(horariosData);

      if (!fechaData.DatosTabla) {
        fechaData.DatosTabla = [{ horarios: horariosData.Horarios }];
      } else {
        fechaData.DatosTabla[0].horarios = horariosData.Horarios;
      }
    }).catch((error) => {
      console.error("Error al obtener horarios:", error);
    });
  }
  
  getMesesPresentes(fechas: any[]): string {
    const mesesPresentes = new Set<string>();
  
    fechas.forEach((fechaData: any) => {
      const nombreMes = new Intl.DateTimeFormat('es', { month: 'long' }).format(fechaData.fecha);
      mesesPresentes.add(nombreMes.toUpperCase());
    });
  
    return Array.from(mesesPresentes).join(' / ');
  }

  formatoFechaComoString(fecha: Date): string {
    // Puedes utilizar una biblioteca como 'date-fns' o simplemente construir la cadena manualmente según tu formato
    // Aquí un ejemplo simple, puedes ajustarlo según tus necesidades
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
  }


  //Esto es una guia de siguiente y anterior
  indiceMostrar: number = 0;
  //Esto es una guia de siguiente y anterior

  mostrarSiguientesFechas(): void {
    const cantidadDiasAMostrar = 7;

    if (this.indiceMostrar + cantidadDiasAMostrar <= this.todasLasFechas.length) {
      const nuevasFechas = this.todasLasFechas.slice(this.indiceMostrar, this.indiceMostrar + cantidadDiasAMostrar);

      // Rellenar con fechas vacías si es necesario
      while (nuevasFechas.length < cantidadDiasAMostrar) {
        nuevasFechas.push({ fecha: null, datos: [] });
      }

      // Asigna el nuevo valor al observable
      this.fechasConHorarios$ = of([...nuevasFechas]);
      this.indiceMostrar += cantidadDiasAMostrar;

      // Habilitar el botón de retroceso solo después de avanzar a la segunda semana
      this.retrocesoHabilitado = this.indiceMostrar >= 2 * cantidadDiasAMostrar;

      this.mesActivo = this.getMesesPresentes(nuevasFechas);
    }
  }
  
  mostrarAnterioresFechas(): void {
    const cantidadDiasAMostrar = 7;
  
    if (this.indiceMostrar >= cantidadDiasAMostrar) {
      this.indiceMostrar -= cantidadDiasAMostrar;
      const nuevasFechas = this.todasLasFechas.slice(this.indiceMostrar, this.indiceMostrar + cantidadDiasAMostrar);
      this.fechasConHorarios$ = of([...nuevasFechas]);
  
      // Actualiza los meses presentes
      this.mesActivo = this.getMesesPresentes(nuevasFechas);
  
      // Actualizar el estado del botón de retroceso
      this.retrocesoHabilitado = this.indiceMostrar >= cantidadDiasAMostrar;
    } else {
      // Si ya estamos en el inicio, retroceder para mostrar los últimos 7 días
      this.mostrarUltimosDias();
  
      // Actualiza los meses presentes
      this.mesActivo = this.getMesesPresentes(this.todasLasFechas);
  
      // Actualizar el estado del botón de retroceso
      this.retrocesoHabilitado = false;
    }
  }
  
  mostrarUltimosDias(): void {
    const cantidadDiasAMostrar = 7;
    const ultimasFechas = this.todasLasFechas.slice(-cantidadDiasAMostrar);
    this.fechasConHorarios$ = of([...ultimasFechas]);
    this.indiceMostrar = this.todasLasFechas.length - cantidadDiasAMostrar;
  }
  

  onCellClicked(e: any) {

  }
  


//onCellClicked refactorizado
// onCellClicked(event: any): void {
//   this.horarioSeleccionado = event.value;

//   for (let i = 0; i < this.rowData.length; i++) {
//     const row = this.rowData[i];

//     for (let j = 1; j <= 7; j++) {
//       const diaProp: keyof IRow = `dia${j}` as keyof IRow;
//       const turnoProp: keyof IRow = `turno${j}` as keyof IRow;

//       if (row[diaProp] === this.horarioSeleccionado) {
//         this.turnoSeleccionado = row[turnoProp];
//         this.fechaSeleccionada = this.Dias[j].Fecha;
//         console.log("-----------")
//         console.log(this.fechaSeleccionada)
//         Swal.fire({
//           title: "Pedir turno",
//           text: `¿Desea confirmar el turno para el horario seleccionado ${this.horarioSeleccionado}?`,
//           icon: "question",
//           showCancelButton: true,
//           confirmButtonText: "Aceptar",
//           cancelButtonText: "Cancelar",
//         }).then((result) => {
//           if (result.value) {
//             console.log(this.turnoSeleccionado, this.fechaSeleccionada);

//           }
//         });

//         break;
//       }
//     }
//   }
// }

   volver() {
    this.pasoActualService.actualizarPasoActual(3);
    this.router.navigate(['/listadeServiciosPrestacionTurnos']);
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



