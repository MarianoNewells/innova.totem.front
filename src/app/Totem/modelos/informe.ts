export interface IInforme {
    Informe: string
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }
  
  export class Informe implements IInforme{
    Informe!: string
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }