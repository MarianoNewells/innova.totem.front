export type NodosHijos = INodoHijo[];

export interface INodoHijo {
  _idAccionAutoGestion: number;
  _accionAutoGestion: any;
  _idTipoDeTramite: number;
  _tipoTramite: any;
  _TextMenu: string;
  _Descripcion: string;
  _IconUrl: any;
  _idTipoItemMenu: number;
  _tipoItemMenu: any;
  _idPantallaAutogestion: number;
  _pantallaAutogestion: any;
  _idSalaDeEspera: number;
  _salaDeEspera: any;
  _idPuestoDeAtencion: number;
  _puestoDeAtencion: any;
  _Id: number;
  _hashCodeCalculated: boolean;
  _hashCode: number;
  _calculandoNombre: boolean;
  _Nombre: string;
  _EstaCargado: boolean;
  _ClientId: number;
}

export class NodoHijo implements INodoHijo {
  _idAccionAutoGestion!: number;
  _accionAutoGestion!: any;
  _idTipoDeTramite!: number;
  _tipoTramite!: any;
  _TextMenu!: string;
  _Descripcion!: string;
  _IconUrl: any;
  _idTipoItemMenu!: number;
  _tipoItemMenu!: any;
  _idPantallaAutogestion!: number;
  _pantallaAutogestion!: any;
  _idSalaDeEspera!: number;
  _salaDeEspera!: any;
  _idPuestoDeAtencion!: number;
  _puestoDeAtencion!: any;
  _Id!: number;
  _hashCodeCalculated!: boolean;
  _hashCode!: number;
  _calculandoNombre!: boolean;
  _Nombre!: string;
  _EstaCargado!: boolean;
  _ClientId!: number;
}
