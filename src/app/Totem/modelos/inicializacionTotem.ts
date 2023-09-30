export interface IInicializacionTotem {
  Id: number;
  Nombre: string;
  Titulo: string;
  Logo: string;
  Descripcion: any;
  ListRecomendacion: ListRecomendacion[];
  IdSalaDeEspera: number;
  IdCentroDeAtencion: number;
}

export class InicializacionTotem implements IInicializacionTotem {
  Id!: number;
  Nombre!: string;
  Titulo!: string;
  Logo!: string;
  Descripcion!: any;
  ListRecomendacion!: ListRecomendacion[];
  IdSalaDeEspera!: number;
  IdCentroDeAtencion!: number;
}

export interface ListRecomendacion {
  Id: number;
  Titulo: string;
  Descripcion: string;
  UrlImagen: string;
}
