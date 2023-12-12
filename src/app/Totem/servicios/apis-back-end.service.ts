import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dni } from '../modelos/dni';
import { FechasDeNacimiento } from '../modelos/fechasDeNacimiento';
import { default as conf } from 'src/assets/config.json';
import { InicializacionTotem } from '../modelos/inicializacionTotem';
import { NodoRaiz } from '../modelos/nodoRaiz';
import { NodosHijos } from '../modelos/nodosHijos';
import { AsignarNuevoTurno, Turnos } from '../modelos/turnos';
import { Autorecepcion } from '../modelos/autorecepcion';
import { Estudios } from '../modelos/estudios';
import { Informe } from '../modelos/informe';
import { Coberturas } from '../modelos/coberturas';
import { TicketRecepcionista } from '../modelos/ticketRecepcionista';
import { TicketParaRetirarEstudio } from '../modelos/ticketParaRetirarEstudio';
import { Acciones } from '../modelos/acciones';
import { Servicios } from '../modelos/servicios';
import { AnulacionDeTurno } from '../modelos/anulacionDeTurno';
import { FechasDeTurnos } from '../modelos/fechasDeTurnos';
import { DatePipe } from '@angular/common';
import { HorarioDiaMedico } from '../modelos/horariosDiasMedico';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApisBackEndService {
  urlBase: string = conf.server.urlBase;

  basicHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  constructor(private http: HttpClient ,private datePipe: DatePipe ) {
    
  }

  getInicializacionTotem() {
    const endPoint = this.urlBase + 'PantallaAutoGestion';
    return this.http.get<InicializacionTotem>(endPoint);
  }

  getAcciones(idTerminal: number){
    const endPoint = this.urlBase + 'ObtenerAcciones';
    let params = new HttpParams();
    params = params.append('IdTerminal', idTerminal);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Acciones>(endPoint, httpOptions);
  }

  getValidaDni(tipo: string, numero: string) {
    const endPoint = this.urlBase + 'RecepcionDeIngreso';
    let params = new HttpParams();
    params = params.append('Numero', numero);
    params = params.append('Tipo', tipo);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Dni>(endPoint, httpOptions);
  }
  getFechasDeNacimiento(fecha: string) {
    const endPoint = this.urlBase + 'ObtenerFechas';
    let params = new HttpParams();
    params = params.append('Fecha', fecha);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<FechasDeNacimiento>(endPoint, httpOptions);
  }
  getNodoRaiz(idTerminal: number) {
    const endPoint = this.urlBase + 'ObtenerNodoRaiz';
    let params = new HttpParams();
    params = params.append('IdTerminal', idTerminal);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<NodoRaiz>(endPoint, httpOptions);
  }
  getNodosHijos(idItemMenu: number) {
    const endPoint = this.urlBase + 'ObtenerNodosHijos';
    let params = new HttpParams();
    params = params.append('IdItemMenu', idItemMenu);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<NodosHijos>(endPoint, httpOptions);
  }
  getTurnosParaAutorecepcion(idPaciente: number, idCentroDeAtencion: string) {
    const endPoint = this.urlBase + 'ObtenerTurnosPaciente';
    let params = new HttpParams();
    params = params.append('idPaciente', idPaciente);
    params = params.append('idCentroDeAtencion', idCentroDeAtencion);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Turnos>(endPoint, httpOptions);
  }
  getAutorecepcion(idTurno: number, token: string) {
    const endPoint = this.urlBase + 'Autorecepcion';
    let params = new HttpParams();
    params = params.append('idTurno', idTurno);
    params = params.append('Token', token);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Autorecepcion>(endPoint, httpOptions);
  }
  getEstudios(idPersona: number) {
    const endPoint = this.urlBase + 'ConsultarEstudios';
    let params = new HttpParams();
    params = params.append('idPersona', idPersona);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Estudios>(endPoint, httpOptions);
  }
  getInforme(idInforme: number, idCentroDeAtencion:number,idPaciente:number) {
    const endPoint = this.urlBase + 'ObtenerTicketEImprimirInforme';
    let params = new HttpParams();
    params = params.append('idInforme', idInforme);
    params = params.append('idCentroAtencion', idCentroDeAtencion);
    params = params.append('idPaciente', idPaciente);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<TicketParaRetirarEstudio>(endPoint, httpOptions);
  }

  getCoberturas(idPersona: number) {
    const endPoint = this.urlBase + 'ObtenerCoberturasDelPaciente';
    let params = new HttpParams();
    params = params.append('idPersona', idPersona);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Coberturas>(endPoint, httpOptions);
  }

  getTicketRecepcionista(idTurno: number) {
    const endPoint = this.urlBase + 'ObtenerTicketRecepcionista';
    let params = new HttpParams();
    params = params.append('IdTurno', idTurno);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<TicketRecepcionista>(endPoint, httpOptions);
  }

  getServicios(idCentroDeAtencion: string) {
    const endPoint = this.urlBase + 'ObtenerServicios';
    let params = new HttpParams();
    params = params.append('IdCentroAtencion', idCentroDeAtencion)
    let httpOptions = {
      headers: this.basicHeader,
      params: params
    };
    return this.http.get<Servicios>(endPoint, httpOptions);
  }

  getPrestacionesDelServicio(idServicio: number,  idCentroDeAtencion: string) {
    const endPoint = this.urlBase + 'PrestacionesDeUnServicio';
    let params = new HttpParams();
    params = params.append('idServicio', idServicio);
    params = params.append('IdCentroDeAtencion', idCentroDeAtencion);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Servicios>(endPoint, httpOptions);
  }

  getPrimerosTurnos(idCentroDeAtencion: string, idServicio: string , idPrestacion: number, dCobertura: string ) {
    const endPoint = this.urlBase + 'PrimerosTurnosDisponibles';
    let params = new HttpParams();
    params = params.append('idServicio', idServicio);
    params = params.append('IdCentroDeAtencion', idCentroDeAtencion);
    params = params.append('pTipoDeTurno', 0);
    params = params.append('idPrestacion', idPrestacion);
    params = params.append('dCobertura', dCobertura);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<Servicios>(endPoint, httpOptions);
  }
  getAnulacionDeTurno(idTurno: number) {
    const endPoint = this.urlBase + 'AnularTurno';
    let params = new HttpParams();
    params = params.append('idTurno', idTurno)
    let httpOptions = {
      headers: this.basicHeader,
      params: params
    };
    return this.http.get<AnulacionDeTurno>(endPoint, httpOptions);
  }
  getAsignarNuevoTurno(idTurno: number, IdPaciente:number,pTipoDeTurno:number,IdPrestacion:number,IdFinanciador:number,IdPlan:number) {
    const endPoint = this.urlBase + 'AsignarNuevoTurno';
    let params = new HttpParams();
    params = params.append('idTurno', idTurno)
    params = params.append('IdPaciente', IdPaciente);
    params = params.append('pTipoDeTurno', 0);
    params = params.append('IdPrestacion', IdPrestacion);
    params = params.append('IdFinanciador', IdFinanciador);
    params = params.append('IdPlan', IdPlan);
    let httpOptions = {
      headers: this.basicHeader,
      params: params
    };
    return this.http.get<AsignarNuevoTurno>(endPoint, httpOptions);
  }
  getFechasTurnosDelMedico(IdRecurso:number,IdServicio:number,IdCentroAtencion:number,pTipoDeTurno:number,IdPrestacion:number,IdPlan:number) {
    const endPoint = this.urlBase + 'ObtenerFechasTurnosDelMedico';
    let params = new HttpParams();
    params = params.append('IdRecurso', IdRecurso)
    params = params.append('IdServicio', IdServicio);
    params = params.append('IdCentroAtencion', IdCentroAtencion);
    params = params.append('pTipoDeTurno', pTipoDeTurno);
    params = params.append('IdPrestacion', IdPrestacion);
    params = params.append('IdPlan', IdPlan);
    let httpOptions = {
      headers: this.basicHeader,
      params: params
    };
    return this.http.get<FechasDeTurnos>(endPoint, httpOptions);
  }
  async getHorariosDiaMedico(IdRecurso:number,IdServicio:number,IdCentroAtencion:number,pTipoDeTurno:number,IdPrestacion:number,FechaTurno:Date) {
    const endPoint = this.urlBase + 'ObtenerHorariosTurno';
    let params = new HttpParams();
    params = params.append('IdServicio', IdServicio);
    params = params.append('IdRecurso', IdRecurso)
    params = params.append('IdCentroAtencion', IdCentroAtencion);
    params = params.append('IdPrestacion', IdPrestacion);
    const fechaString = this.datePipe.transform(FechaTurno,"dd/MM/yyyy")
    if(fechaString) {
      params = params.append('fechaTurno', fechaString )
    };
    params = params.append('pTipoDeTurno', pTipoDeTurno);

    let httpOptions = {
      headers: this.basicHeader,
      params: params
    };
     return await lastValueFrom(this.http.get<HorarioDiaMedico>(endPoint, httpOptions))
  }
}
