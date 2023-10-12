import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dni } from '../modelos/dni';
import { FechasDeNacimiento } from '../modelos/fechasDeNacimiento';
import { default as conf } from 'src/assets/config.json';
import { InicializacionTotem } from '../modelos/inicializacionTotem';
import { NodoRaiz } from '../modelos/nodoRaiz';
import { NodosHijos } from '../modelos/nodosHijos';
import { Turnos } from '../modelos/turnos';
import { Autorecepcion } from '../modelos/autorecepcion';

@Injectable({
  providedIn: 'root',
})
export class ApisBackEndService {
  urlBase: string = conf.server.urlBase;

  basicHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  constructor(private http: HttpClient) {}

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
  getInicializacionTotem() {
    const endPoint = this.urlBase + 'PantallaAutoGestion';
    return this.http.get<InicializacionTotem>(endPoint);
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
  getImprimir(nombrePdf: string, nombreImpresora: string) {
    const endPoint = "http://localhost:8080/";
    let params = new HttpParams();
    params = params.append('nombrePdf', nombrePdf);
    params = params.append('impresora', nombreImpresora);
    let httpOptions = {
      headers: this.basicHeader,
      params: params,
    };
    return this.http.get<any>(endPoint, httpOptions);
  }
}
