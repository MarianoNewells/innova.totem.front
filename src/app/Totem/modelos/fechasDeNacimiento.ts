export interface IFechasDeNacimiento {
  FechasLargas: string[];
  FechasCortas: string[];
  Codigo: number;
  Mensaje: any;
  IdRequest: any;
  Exito: boolean;
  Mensajes: any[];
  HasException: boolean;
}

export class FechasDeNacimiento implements IFechasDeNacimiento {
  FechasLargas!: string[];
  FechasCortas!: string[];
  Codigo!: number;
  Mensaje!: any;
  IdRequest!: any;
  Exito!: boolean;
  Mensajes!: any[];
  HasException!: boolean;
}
