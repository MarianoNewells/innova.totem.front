export interface ITurnos {
  Turnos: ITurno[];
  Codigo: number;
  Mensaje: any;
  IdRequest: any;
  Exito: boolean;
  Mensajes: any[];
  HasException: boolean;
}

export class Turnos implements ITurnos {
  Turnos!: Turno[];
  Codigo!: number;
  Mensaje!: any;
  IdRequest!: any;
  Exito!: boolean;
  Mensajes!: any[];
  HasException!: boolean;
}

export interface ITurno {
  idTurno: number;
  FechaTurnoConDia: string;
  HoraTurno: string;
  CentroAtencion_Servicio_Nombre: string;
  Recurso_Nombre: string;
  TipoDeTurnoAsignadoNombre: string;
  Cobertura_Nombre: string;
  AceptaAutogestion: boolean;
}

export class Turno implements ITurno {
  idTurno!: number;
  FechaTurnoConDia!: string;
  HoraTurno!: string;
  CentroAtencion_Servicio_Nombre!: string;
  Recurso_Nombre!: string;
  TipoDeTurnoAsignadoNombre!: string;
  Cobertura_Nombre!: string;
  AceptaAutogestion!: boolean;
}
