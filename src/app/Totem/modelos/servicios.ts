export interface IServicios {
    idServicio: number
    Nombre: string
  }
  
  export class Servicios implements IServicios{
    idServicio!: number
    Nombre!: string
  }