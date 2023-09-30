export interface IAutorecepcion {
  ErrorProceso: string;
  ErrorMensaje: string;
  ReporteTicketString: string;
  Codigo: number;
  Mensaje: string;
  IdRequest: any;
  Exito: boolean;
  Mensajes: any[];
  HasException: boolean;
}

export class Autorecepcion implements IAutorecepcion {
  ErrorProceso!: string;
  ErrorMensaje!: string;
  ReporteTicketString!: string;
  Codigo!: number;
  Mensaje!: string;
  IdRequest!: any;
  Exito!: boolean;
  Mensajes!: any[];
  HasException!: boolean;
}
